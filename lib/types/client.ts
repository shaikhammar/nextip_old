import { Prisma } from '@prisma/client'
import { Currency, type CurrencyId } from './currency';
import { Payment } from './payment';
import { Invoice } from './invoice';
import { Company, CompanyId } from './company';

export type ClientId = number & { __flavor?: 'ClientId' };

export interface Client {
    clientId: ClientId;
    name?: string;
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
    currency?: Currency;
    companyId: CompanyId;
    company?: Company;
    payment?: Payment[];
    Invoice?: Invoice[];
}
