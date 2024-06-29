import { Prisma } from '@prisma/client'
import { BankAccount, BankAccountId } from './bankaccount';
import { Client, ClientId } from './client';
import { Invoice } from './invoice';
import { ExchangeRate, ExchangeRateId } from './currency';
import { Company, CompanyId } from './company';

export type PaymentId = string & { __flavor?: 'PaymentId' };

export interface Payment {
    paymentId: PaymentId;
    amount: Prisma.Decimal;
    exchangeRateId?: ExchangeRateId | null;
    exchangeRate?: ExchangeRate;
    paymentDate: Date;
    transactionId?: string | null;
    status: PaymentStatus;
    notes?: string | null;
    clientId: ClientId;
    client?: Client;
    bankAccountId: BankAccountId;
    bankAccount?: BankAccount;
    createdAt: Date;
    updatedAt: Date | null;
    companyId: CompanyId;
    company?: Company;
    invoice?: Invoice[];
}

// export type PaymentInvoiceId = string & { __flavor?: 'PaymentInvoiceId' };

// export interface PaymentInvoice {
//     paymentInvoiceId: PaymentInvoiceId;
//     paymentId: PaymentId;
//     invoiceId: string;
//     createdAt: Date;
//     updatedAt: Date;
// }

enum PaymentStatus {
    Pending = 'Pending',
    Cancelled = 'Cancelled',
    Failed = 'Failed',
    Completed = 'Completed',
    PartiallyRefunded = 'Partially Refunded',
    Refunded = 'Refunded',
    PartiallyUnpaid = 'Partially Unpaid',
    Deleted = 'Deleted',
}
