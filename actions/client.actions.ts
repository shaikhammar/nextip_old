"use server"

import db from "@/lib/db";
import { Prisma } from '@prisma/client'
import { Currrency } from "./currency.actions";

export interface ClientNote {
    id: number,
    note: string,
    createdAt: Date | null,
    clientId: number
}

export interface Client {
    id: number,
    name: string | null,
    code: string,
    address: string | null,
    email: string | null,
    balance: Prisma.Decimal | null,
    currency?: Currrency | null,
    createdAt: Date | null,
    updatedAt: Date | null,
    isDisabled: boolean,
    disabledAt: Date | null,
    isDeleted: boolean,
    deletedAt: Date | null,
    clientNote?: ClientNote[] | null
}

export type ModifiedClient = {
    id: number;
    name: string | null;
    code: string;
    balance: string | null;
};

interface ActionResult {
    error?: any;
    data?: string | null;
}

export async function getClients(withNotes: boolean = false): Promise<ActionResult> {
    let clients: Client[]
    try {
        if (withNotes) {
            clients = await db.client.findMany({
                include: {
                    currency: true,
                    clientNote: true
                }
            })
        } else {
            clients = await db.client.findMany({
                include: {
                    currency: true,
                }
            })
        }
    } catch (error: any) {
        console.log(error)
        return {
            error: error.message || "Error fetching clients. Please try again after sometime."
        }
    }
    return {
        data: JSON.stringify(clients)
    }
}

export async function getClientNotes(clientId: number): Promise<ActionResult> {
    let clientNotes: ClientNote[]
    try {
        clientNotes = await db.clientNote.findMany({
            where: {
                clientId: clientId
            }
        })
    } catch (error: any) {
        console.log(error)
        return {
            error: error.message || "Error fetching client notes. Please try again after sometime."
        }
    }
    return {
        data: JSON.stringify(clientNotes)
    }
}

export async function setClient(newClient: Client) {

    let client: Prisma.ClientCreateInput

    client = {
        name: newClient.name,
        code: newClient.code,
        address: newClient.address,
        email: newClient.email,
        currency: {
            connect: {
                code: newClient.currency?.code
            }
        }
    }

    try {
        await db.client.create({
            data: client
        })
    } catch (error: any) {
        console.log(error)
        return {
            error: error.message || "Error adding client note. Please try again after sometime."
        }
    }
}

export async function setClientNotes(clientId: number, note: string) {

    try {
        await db.clientNote.create({
            data: {
                clientId: clientId,
                note: note
            }
        })
    } catch (error: any) {
        console.log(error)
        return {
            error: error.message || "Error adding client note. Please try again after sometime."
        }
    }
}

function formatBalance(balance: Prisma.Decimal, currencyCode: string): string {
    // Convert balance to number and format with commas and two decimal places
    const balanceNumber = parseFloat(balance.toString());
    const formattedBalance = balanceNumber.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    return `${currencyCode} ${formattedBalance}`;
}

export async function getModifiedClients(clients: Client[]) {
    return clients.map(client => ({
        id: client.id,
        name: client.name,
        code: client.code,
        balance: client.balance && client.currency ? formatBalance(client.balance, client.currency.code) : null,
    }));
}