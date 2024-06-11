import { z } from "zod";
import { Prisma } from '@prisma/client';

export const signUpFormSchema = z
    .object({
        firstName: z.string().min(2, { message: 'First name must contain more than 2 characters.' }).max(50),
        lastName: z.string().min(2, { message: 'Last name must contain more than 2 characters.' }).max(50),
        email: z.string().email({ message: "Invalid email. Please enter a valid email." }),
        password: z
            .string()
            .min(8, { message: "Password must be 8 characters long." }),
        confirmPassword: z
            .string()
            .min(8, { message: "Password must be 8 characters long." }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match.",
        path: ["confirmPassword"],
    });

export const loginFormSchema = z
    .object({
        email: z.string().email({ message: "Invalid email. Please enter a valid email." }),
        password: z
            .string()
            .min(8, { message: "Password must be 8 characters long." }),
    })

export const clientFormSchema = z
    .object({
        clientName: z.string().max(50, { message: "Client name too large. Please use below address field." }),
        clientCode: z.
            string()
            .min(3, { message: "Client code must be at least 3 characters long." })
            .max(6, { message: "Client code cannot be more than 6 characters long. Please use code with 6 character or less." }),
        clientAddress: z
            .string()
            .min(5, { message: "Please enter the address of the client." }),
        clientCurrency: z.string().min(3, { message: "Please select a currency." })
    }) //satisfies z.Schema<Prisma.ClientUncheckedCreateInput>


export const currencyFormSchema = z
    .object({
        currencyName: z.string().min(3, { message: "Currency name too small. Please check." }),
        currencyCode: z.string().length(3, { message: "Use 3 character ISO currency codes." })
    })