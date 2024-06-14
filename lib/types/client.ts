import { z } from 'zod';
import { Prisma } from '@prisma/client'
import { Currency, currency, currencyId, type CurrencyId } from './currency';

export type ClientId = number & { __flavor?: 'ClientId' };

export interface Client {
    clientId: ClientId;
    name: string | null;
    code: string;
    address: string | null;
    email: string | null;
    balance: Prisma.Decimal;
    createdAt: Date | null;
    updatedAt: Date | null;
    isDisabled: boolean;
    disabledAt: Date | null;
    isDeleted: boolean;
    deletedAt: Date | null;
    currencyId: CurrencyId;
    currency: Currency;
}

export interface ClientInitializer {
    clientId: ClientId;
    name?: string;
    code: string;
    address?: string;
    email?: string | null;
    balance: Prisma.Decimal;
    createdAt?: Date | null;
    updatedAt?: Date | null;
    isDisabled?: boolean;
    disabledAt?: Date | null;
    isDeleted?: boolean;
    deletedAt?: Date | null;
    currencyId: CurrencyId;
    currency: Currency;
}

export interface ClientMutator {
    clientId?: ClientId;
    name?: string | null;
    code?: string;
    address?: string | null;
    email?: string | null;
    balance?: Prisma.Decimal;
    createdAt?: Date | null;
    updatedAt?: Date | null;
    isDisabled?: boolean;
    disabledAt?: Date | null;
    isDeleted?: boolean;
    deletedAt?: Date | null;
    currencyId?: CurrencyId;
    currency?: Currency | null;
}

export const clientId = z.number() as unknown as z.Schema<ClientId>;

export const client = z.object({
    clientId: clientId,
    name: z.string().nullable(),
    code: z.string(),
    address: z.string().nullable(),
    email: z.string().nullable(),
    balance: z.number(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable(),
    isDisabled: z.boolean(),
    disabledAt: z.date().nullable(),
    isDeleted: z.boolean(),
    deletedAt: z.date().nullable(),
    currencyId: currencyId
}) as unknown as z.Schema<Client>;

export const clientInitializer = z.object({
    clientId: clientId.optional(),
    name: z.string().optional(),
    code: z.string(),
    address: z.string().optional(),
    email: z.string().optional(),
    balance: z.number().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    isDisabled: z.boolean().optional(),
    disabledAt: z.date().optional(),
    isDeleted: z.boolean().optional(),
    deletedAt: z.date().optional(),
    currencyId: currencyId,
    currency: currency
}) //as unknown as z.Schema<ClientInitializer>;

export const clientMutator = z.object({
    clientId: clientId.optional(),
    name: z.string().optional().nullable(),
    code: z.string().optional(),
    address: z.string().optional().nullable(),
    email: z.string().optional().nullable(),
    balance: z.number().optional(),
    createdAt: z.date().optional().nullable(),
    updatedAt: z.date().optional().nullable(),
    isDisabled: z.boolean().optional(),
    disabledAt: z.date().optional().nullable(),
    isDeleted: z.boolean().optional(),
    deletedAt: z.date().optional().nullable(),
    currencyId: currencyId.optional()
}) as unknown as z.Schema<ClientMutator>;