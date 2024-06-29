"use server"
import db from "@/lib/db";
import { ActionResult } from ".";
import { Currency } from "@/lib/types/currency";
import { currencyFormSchema } from "@/components/currency-form"
import { exchangeRateFormSchema } from "@/components/exchangerate-form"
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

export const setExchangeRate = async (values: z.infer<typeof exchangeRateFormSchema>) => {
    try {
        await db.exchangeRate.create({
            data: {
                rate: values.rate,
                currency: {
                    connect: {
                        code: values.currency.code
                    }
                }
            }
        })
    } catch (error: any) {
        console.log(error)
        return {
            error: error.message || "Error adding exchange rate. Please try again after sometime."
        }
    }
}