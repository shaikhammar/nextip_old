import { Prisma } from '@prisma/client'
import { Client, ClientId } from './client';
import { Payment } from './payment';
import { InvoiceItem } from './invoice-item';
import { ExchangeRate, ExchangeRateId } from './currency';
import { Company, CompanyId } from './company';

export type InvoiceId = string & { __flavor?: 'InvoiceId' };

export interface Invoice {
    invoiceId: InvoiceId;
    invoiceNumber: string;
    invoiceDate: Date;
    poNumber: string | null;
    clientId: ClientId;
    client?: Client;
    notes: string | null;
    status: InvoiceStatus | InvoiceStatus.Draft;
    invoiceTotal: Prisma.Decimal;
    baseCurrencyInvoiceTotal: Prisma.Decimal;
    exchangeRateId: ExchangeRateId | null;
    exchangeRate: ExchangeRate | null;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
    isDeleted: boolean;
    companyId: CompanyId;
    company?: Company;
    invoiceLineItem: InvoiceItem[];
    payment?: Payment[];
}

export enum InvoiceStatus {
    Draft = 'Draft',
    Sent = 'Sent',
    Paid = 'Paid',
    PartiallyPaid = 'Partial/Deposit',
    Revised = 'Revised',
    Cancelled = 'Cancelled',
    Deleted = 'Deleted',
}
