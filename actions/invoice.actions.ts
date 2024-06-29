"use server"

import db from "@/lib/db";
import { Prisma } from '@prisma/client'
import { ActionResult } from ".";
import { Invoice, InvoiceMutator, invoiceFormSchema } from "@/lib/types/invoice";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export async function getInvoices(): Promise<ActionResult> {
    let invoices
    try {
        invoices = await db.invoice.findMany({
            select: {
                invoiceId: true,
                invoiceNumber: true,
                invoiceDate: true,
                poNumber: true,
                clientId: true,
                notes: true,
                status: true,
                invoiceTotal: true,
                baseCurrencyInvoiceTotal: true,
                createdAt: true,
                updatedAt: true,
                deletedAt: true,
                isDeleted: true,
                client: {
                    select: {
                        clientId: true,
                        name: true,
                        email: true,
                        address: true,
                        currency: {
                            select: {
                                currencyId: true,
                                code: true
                            }
                        }
                    }
                },
            }
        })
    } catch (error: any) {
        // console.log(error)
        return {
            error: error.message || "Error fetching invoices. Please try again after sometime."
        }
    }
    return {
        data: JSON.stringify(invoices)
    }
}

export async function getinvoice(invoiceId: string): Promise<ActionResult> {
    let invoice
    try {
        invoice = await db.invoice.findUnique({
            where: {
                invoiceId: invoiceId
            },
            include: {
                client: true,
                invoiceLineItem: true,
                paymentInvoice: true
            }
        })
        // console.log(invoice)
    } catch (error: any) {
        // console.log(error)
        return {
            error: error.message || "Error fetching invoices. Please try again after sometime."
        }
    }
    return {
        data: JSON.stringify(invoice)
    }
}

// export async function getinvoiceNotes(invoiceId: number): Promise<ActionResult> {
//     let invoiceNotes: invoiceNote[]
//     try {
//         invoiceNotes = await db.invoiceNote.findMany({
//             where: {
//                 invoiceId: invoiceId
//             }
//         })
//     } catch (error: any) {
//         console.log(error)
//         return {
//             error: error.message || "Error fetching invoice notes. Please try again after sometime."
//         }
//     }
//     return {
//         data: JSON.stringify(invoiceNotes)
//     }
// }

export async function setinvoice(newinvoice: z.infer<typeof invoiceFormSchema>, invoiceId?: string | null) {

    let existinginvoice
    if (invoiceId) {
        existinginvoice = await getinvoice(invoiceId!)
    }
    if (existinginvoice) {
        let invoice: Prisma.InvoiceUpdateInput
        invoice = {
            invoiceId: newinvoice.invoiceId,
            invoiceNumber: newinvoice.invoiceNumber,
            invoiceDate: newinvoice.invoiceDate,
            poNumber: newinvoice.poNumber,
            notes: newinvoice.notes,
            status: newinvoice.status,
            invoiceTotal: newinvoice.invoiceTotal,
            baseCurrencyInvoiceTotal: newinvoice.baseCurrencyInvoiceTotal,
            invoiceLineItem: {
                create: newinvoice.invoiceLineItem
            }
        }
        try {
            const updatedinvoice = await db.invoice.update({
                where: {
                    invoiceId: invoiceId!
                },
                data: invoice
            })
            revalidatePath("/invoice");
            return {
                success: `${updatedinvoice.invoiceNumber} updated successfully.`
            }
        } catch (error: any) {
            // console.log(error)
            return {
                error: error.message || "Error adding invoice note. Please try again after sometime."
            }
        }
    } else {
        let invoice: Prisma.InvoiceCreateInput
        // console.log(newinvoice)
        invoice = {
            invoiceId: newinvoice.invoiceId,
            invoiceNumber: newinvoice.invoiceNumber,
            invoiceDate: newinvoice.invoiceDate,
            poNumber: newinvoice.poNumber,
            notes: newinvoice.notes,
            status: newinvoice.status,
            invoiceTotal: newinvoice.invoiceTotal,
            baseCurrencyInvoiceTotal: newinvoice.baseCurrencyInvoiceTotal,
            client: {
                connect: {
                    clientId: newinvoice.clientId
                }
            },
            invoiceLineItem: {
                create: newinvoice.invoiceLineItem
            }
        }
        try {
            const createdinvoice = await db.invoice.create({
                data: invoice
            })
            revalidatePath("/invoice");
            return {
                success: `${createdinvoice.invoiceNumber} created successfully.`
            }
        } catch (error: any) {
            // console.log(error)
            return {
                error: error.message || "Error adding invoice note. Please try again after sometime."
            }
        }
    }
}

// export async function setinvoiceNotes(invoiceId: number, note: string) {

//     try {
//         await db.invoiceNote.create({
//             data: {
//                 invoiceId: invoiceId,
//                 note: note
//             }
//         })
//     } catch (error: any) {
//         console.log(error)
//         return {
//             error: error.message || "Error adding invoice note. Please try again after sometime."
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

// export async function getModifiedinvoices(invoices: invoice[]) {
//     return invoices.map(invoice => ({
//         invoiceId: invoice.invoiceId,
//         name: invoice.name,
//         code: invoice.code,
//         balance: invoice.balance && invoice.currency ? formatBalance(invoice.balance, invoice.currency.code) : null,
//     }));
// }

// export async function getModeledinvoice(formData: z.infer<typeof invoiceFormSchema>): Promise<invoice> {
//     const invoiceCurrency: Currrency = {
//         code: formData.invoiceCurrency
//         name: null
//     }
//     return {
//         name: formData.invoiceName,
//         code: formData.invoiceCode,
//         address: formData.invoiceAddress,
//         email: null, // Default value as it's not in form data
//         balance: null, // Default value as it's not in form data
//         currency: invoiceCurrency,
//     };
// }