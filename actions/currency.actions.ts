import db from "@/lib/db";
import { Client } from "./client.actions"

export interface Currrency {
    id: number,
    code: string,
    name: string | null,
    exchangeRate?: ExchangeRate[] | null
    client?: Client[] | null
}

export interface ExchangeRate {
    id: number,
    date: string,
    rate: number,
    currencyId: number
}

interface ActionResult {
    error?: string;
    currencies?: Currrency[];
}

export async function getCurrencies(): Promise<ActionResult> {
    let currencies: Currrency[]
    try {
        currencies = await db.currency.findMany()
    } catch (error: any) {
        console.log(error)
        return {
            error: error.message || "Error fetching currency. Please try again after sometime."
        }
    }
    return {
        currencies: currencies
    }
}

export async function setCurrency(newCurrency: Currrency) {

    try {
        await db.currency.create({
            data: {
                code: newCurrency.code,
                name: newCurrency.name,
            }
        })
    } catch (error: any) {
        console.log(error)
        return {
            error: error.message || "Error adding currency. Please try again after sometime."
        }
    }
}