"use server"
import { z } from "zod";
import db from "@/lib/db";
import { hash, verify } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { lucia } from "@/lib/auth";
import { redirect } from "next/navigation";
import { generateIdFromEntropySize } from "lucia";
import { loginFormSchema, signUpFormSchema } from "@/lib/form-types";
import { Prisma } from '@prisma/client';
import { cache } from "react";
import type { Session, User } from "lucia";


interface ActionResult {
    error?: string;
    success?: string;
}


export async function signup(formData: z.infer<typeof signUpFormSchema>): Promise<ActionResult> {
    "use server";
    const firstName = formData.firstName;
    const lastName = formData.lastName;
    const email = formData.email;
    const password = formData.password;
    // username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
    // keep in mind some database (e.g. mysql) are case insensitive
    if (
        typeof firstName !== "string" ||
        firstName.length < 3 ||
        firstName.length > 51
    ) {
        return {
            error: "Invalid first name"
        };
    }
    if (
        typeof lastName !== "string" ||
        lastName.length < 3 ||
        lastName.length > 51
    ) {
        return {
            error: "Invalid last name"
        };
    }
    if (
        typeof email !== "string" ||
        !email.includes("@")
    ) {
        return {
            error: "Invalid email"
        }
    }
    if (
        typeof password !== "string" ||
        password.length < 6 ||
        password.length > 255
    ) {
        return {
            error: "Invalid password"
        };
    }

    const hashedPassword = await hash(password, {
        // recommended minimum parameters
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1
    });
    const userId = generateIdFromEntropySize(10); // 16 characters long


    try {
        console.log(userId)
        const user = await db.user.create({
            data: {
                userId: userId,
                firstName: firstName,
                lastName: lastName,
                email: email.toLowerCase(),
                password: hashedPassword
            }
        });
        console.log(user)
    } catch (error: any) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            // DONE: check if username is already used
            if (error.code === 'P2002') {
                return {
                    error: 'Email already exists. Please use another email.'
                }

            } else {
                return {
                    error: error.message
                }
            }
        }

    }

    // const session = await lucia.createSession(userId, {});
    // const sessionCookie = lucia.createSessionCookie(session.id);
    // cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    return {
        success: `${email} created successfully. Please login with your credentials.`
    }
}

export async function login(formData: z.infer<typeof loginFormSchema>): Promise<ActionResult> {
    "use server";
    const email = formData.email
    const password = formData.password
    if (
        typeof email !== "string" ||
        !email.includes("@")
    ) {
        return {
            error: "Invalid email"
        }
    }
    if (
        typeof password !== "string" ||
        password.length < 6 ||
        password.length > 255
    ) {
        return {
            error: "Invalid password"
        };
    }

    let existingUser;

    try {
        existingUser = await db.user.findUnique({
            where: {
                email: email.toLowerCase()
            },
            select: {
                id: true,
                userId: true,
                firstName: true,
                lastLogin: true,
                email: true,
                password: true
            }
        })
    } catch (error) {
        return {
            error: "Incorrect username or password"
        }
    }
    if (!existingUser) {
        // NOTE:
        // Returning immediately allows malicious actors to figure out valid usernames from response times,
        // allowing them to only focus on guessing passwords in brute-force attacks.
        // As a preventive measure, you may want to hash passwords even for invalid usernames.
        // However, valid usernames can be already be revealed with the signup page among other methods.
        // It will also be much more resource intensive.
        // Since protecting against this is non-trivial,
        // it is crucial your implementation is protected against brute-force attacks with login throttling etc.
        // If usernames are public, you may outright tell the user that the username is invalid.
        return {
            error: "Incorrect username or password"
        };
    }

    const validPassword = await verify(existingUser.password, password, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1
    });
    if (!validPassword) {
        return {
            error: "Incorrect username or password"
        };
    }

    const session = await lucia.createSession(existingUser.userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    return redirect("/dashboard");
}

export const validateRequest = cache(
    async (): Promise<{ user: User; session: Session } | { user: null; session: null }> => {
        const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
        if (!sessionId) {
            return {
                user: null,
                session: null
            };
        }

        const result = await lucia.validateSession(sessionId);
        // next.js throws when you attempt to set cookie when rendering page
        try {
            if (result.session && result.session.fresh) {
                const sessionCookie = lucia.createSessionCookie(result.session.id);
                cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
            }
            if (!result.session) {
                const sessionCookie = lucia.createBlankSessionCookie();
                cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
            }
        } catch { }
        return result;
    }
);


export async function logout(): Promise<ActionResult> {
    "use server";
    const { session } = await validateRequest();
    if (!session) {
        return {
            error: "Unauthorized"
        };
    }

    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    return redirect("/login");
}