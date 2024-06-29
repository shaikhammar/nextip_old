import { Prisma } from '@prisma/client';

export type CurrencyId = string & { __flavor?: 'currencyId' };

export interface Currency {
    currencyId: CurrencyId;
    code: string;
    name: string | null;
}

export type ExchangeRateId = number & { __flavor?: 'ExchangeRateId' };

export interface ExchangeRate {
    exchangeRateId: ExchangeRateId;
    date: Date;
    rate: Prisma.Decimal;
    currencyId: number;
    currency?: Currency;
}


// export const exchangeRateFormSchema = z.object({
//     date: z.date({ message: "Please enter a valid date" }),
//     rate: z.number(),
//     currency: z.string().min(3, { message: "Please select a currency." })
// })