import { z } from 'zod';

export type CurrencyId = number & { __flavor?: 'currencyId' };

export interface Currency {
    currencyId: CurrencyId;
    code: string;
    name: string | null;
}

export interface CurrencyInitializer {
    currencyId?: CurrencyId;
    code: string;
    name?: string | null;
}

export interface CurrencyMutator {
    currencyId?: CurrencyId;
    code?: string;
    name?: string | null;
}

export const currencyId = z.number() as unknown as z.Schema<CurrencyId>;

export const currency = z.object({
    currencyId: currencyId,
    code: z.string(),
    name: z.string().nullable()
}) as unknown as z.Schema<Currency>;

export const currencyInitializer = z.object({
    currencyId: currencyId.optional(),
    code: z.string(),
    name: z.string().optional().nullable()
}) as unknown as z.Schema<CurrencyInitializer>;

export const currencyMutator = z.object({
    currencyId: currencyId.optional(),
    code: z.string().optional(),
    name: z.string().optional().nullable()
}) as unknown as z.Schema<CurrencyMutator>;

export type ExchangeRateId = number & { __flavor?: 'ExchangeRateId' };

export interface ExchangeRate {
    exchangeRateId: ExchangeRateId;
    date: Date;
    rate: number;
    currencyId: number;
}

export interface ExchangeRateInitializer {
    exchangeRateId?: ExchangeRateId;
    date: Date;
    rate: number;
    currencyId: CurrencyId;
}

export interface CurrrencyMutator {
    exchangeRateId?: ExchangeRateId;
    date?: Date;
    rate?: number;
    currencyId?: CurrencyId;
}

export const exchangeRateId = z.number() as unknown as z.Schema<ExchangeRateId>;

export const exchangeRate = z.object({
    exchangeRateId: exchangeRateId,
    date: z.date(),
    rate: z.number(),
    currencyId: currencyId
})

export const exchangeRateInitializer = z.object({
    exchangeRateId: exchangeRateId.optional(),
    date: z.date(),
    rate: z.number(),
    currencyId: currencyId
})

export const exchangeRateMutator = z.object({
    exchangeRateId: exchangeRateId.optional(),
    date: z.date().optional(),
    rate: z.number().optional(),
    currencyId: currencyId.optional()
})