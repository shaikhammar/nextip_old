import db from "@/lib/db";
import { ActionResult } from ".";
import { Currrency } from "@/lib/types";

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
        data: JSON.stringify(currencies)
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