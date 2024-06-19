import { z } from 'zod';

export type CurrencyId = number & { __flavor?: 'currencyId' };

export interface Currency {
    currencyId: CurrencyId;
    code: string;
    name: string | null;
}

export interface CurrencyMutator {
    currencyId?: CurrencyId;
    code?: string;
    name?: string | null;
}

export const currencyFormSchema = z.object({
    name: z.string().min(3, { message: "Currency name too small. Please check." }),
    code: z.string().length(3, { message: "Use 3 character ISO currency codes." })
})

export type ExchangeRateId = number & { __flavor?: 'ExchangeRateId' };

export interface ExchangeRate {
    exchangeRateId: ExchangeRateId;
    date: Date;
    rate: number;
    currencyId: number;
}

export interface ExchangeRateMutator {
    exchangeRateId?: ExchangeRateId;
    date?: Date;
    rate?: number;
    currencyId?: CurrencyId;
}

export const exchangeRateFormSchema = z.object({
    date: z.date({ message: "Please enter a valid date" }),
    rate: z.number(),
    currency: z.string().min(3, { message: "Please select a currency." })
})