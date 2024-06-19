"use server"
import db from "@/lib/db";
import { ActionResult } from ".";
import { currencyFormSchema, Currency } from "@/lib/types/currency";
import { z } from "zod";

export async function getCurrencies(): Promise<ActionResult> {
    let currencies: Currency[]
    try {
        currencies = await db.currency.findMany()
    } catch (error: any) {
        console.log(error)
        return {
            error: error.message || "Error fetching currency. Please try again after sometime."
        }
    }
    return {
        data: JSON.stringify(currencies)
    }
}

export async function setCurrency(newCurrency: z.infer<typeof currencyFormSchema>) {

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