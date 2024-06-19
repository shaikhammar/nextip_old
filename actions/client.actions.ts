"use server"

import db from "@/lib/db";
import { Prisma } from '@prisma/client'
import { ActionResult } from ".";
import { Client, ClientMutator, clientFormSchema } from "@/lib/types/client";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export async function getClients(): Promise<ActionResult> {
    let clients: Client[]
    try {
        clients = await db.client.findMany({
            include: {
                currency: true
            }
        })
    } catch (error: any) {
        // console.log(error)
        return {
            error: error.message || "Error fetching clients. Please try again after sometime."
        }
    }
    return {
        data: JSON.stringify(clients)
    }
}

export async function getClient(clientId: number): Promise<ActionResult> {
    let client: ClientMutator | null
    try {
        client = await db.client.findUnique({
            where: {
                clientId: clientId
            },
            include: {
                currency: true
            }
        })
        // console.log(client)
    } catch (error: any) {
        // console.log(error)
        return {
            error: error.message || "Error fetching clients. Please try again after sometime."
        }
    }
    return {
        data: JSON.stringify(client)
    }
}

// export async function getClientNotes(clientId: number): Promise<ActionResult> {
//     let clientNotes: ClientNote[]
//     try {
//         clientNotes = await db.clientNote.findMany({
//             where: {
//                 clientId: clientId
//             }
//         })
//     } catch (error: any) {
//         console.log(error)
//         return {
//             error: error.message || "Error fetching client notes. Please try again after sometime."
//         }
//     }
//     return {
//         data: JSON.stringify(clientNotes)
//     }
// }

export async function setClient(newClient: z.infer<typeof clientFormSchema>, clientId?: number | null) {

    let existingClient
    if (clientId) {
        existingClient = await getClient(clientId!)
    }
    if (existingClient) {
        let client: Prisma.ClientUpdateInput
        client = {
            name: newClient.name,
            code: newClient.code,
            address: newClient.address,
            email: newClient.email,
            currency: {
                connect: {
                    code: newClient.currency
                }
            }
        }
        try {
            const updatedClient = await db.client.update({
                where: {
                    clientId: clientId!
                },
                data: client
            })
            revalidatePath("/client");
            return {
                success: `${updatedClient.name} updated successfully.`
            }
        } catch (error: any) {
            // console.log(error)
            return {
                error: error.message || "Error adding client note. Please try again after sometime."
            }
        }
    } else {
        let client: Prisma.ClientCreateInput
        // console.log(newClient)
        client = {
            name: newClient.name,
            code: newClient.code,
            address: newClient.address,
            email: newClient.email,
            currency: {
                connect: {
                    code: newClient.currency
                }
            }
        }
        try {
            const createdClient = await db.client.create({
                data: client
            })
            revalidatePath("/client");
            return {
                success: `${createdClient.name} created successfully.`
            }
        } catch (error: any) {
            // console.log(error)
            return {
                error: error.message || "Error adding client note. Please try again after sometime."
            }
        }
    }
}

// export async function setClientNotes(clientId: number, note: string) {

//     try {
//         await db.clientNote.create({
//             data: {
//                 clientId: clientId,
//                 note: note
//             }
//         })
//     } catch (error: any) {
//         console.log(error)
//         return {
//             error: error.message || "Error adding client note. Please try again after sometime."
//         }
//     }
// }

// function formatBalance(balance: Prisma.Decimal, currencyCode: string): string {
//     // Convert balance to number and format with commas and two decimal places
//     const balanceNumber = parseFloat(balance.toString());
//     const formattedBalance = balanceNumber.toLocaleString('en-US', {
//         minimumFractionDigits: 2,
//         maximumFractionDigits: 2,
//     });
//     return `${currencyCode} ${formattedBalance}`;
// }

// export async function getModifiedClients(clients: Client[]) {
//     return clients.map(client => ({
//         clientId: client.clientId,
//         name: client.name,
//         code: client.code,
//         balance: client.balance && client.currency ? formatBalance(client.balance, client.currency.code) : null,
//     }));
// }

// export async function getModeledClient(formData: z.infer<typeof clientFormSchema>): Promise<Client> {
//     const clientCurrency: Currrency = {
//         code: formData.clientCurrency
//         name: null
//     }
//     return {
//         name: formData.clientName,
//         code: formData.clientCode,
//         address: formData.clientAddress,
//         email: null, // Default value as it's not in form data
//         balance: null, // Default value as it's not in form data
//         currency: clientCurrency,
//     };
// }