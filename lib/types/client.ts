import { z } from 'zod';
import { Prisma } from '@prisma/client'
import { Currency, type CurrencyId } from './currency';

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

