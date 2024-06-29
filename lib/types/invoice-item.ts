import { Prisma } from '@prisma/client'
import { InvoiceId } from './invoice';

export type InvoiceItemId = string & { __flavor?: 'InvoiceItemId' };

export interface InvoiceItem {
    invoiceItemId: InvoiceItemId;
    itemOrder: number;
    invoiceId: InvoiceId;
    itemDescription: string;
    itemUnitCost: Prisma.Decimal;
    itemQuantity: Prisma.Decimal;
    itemTotal: Prisma.Decimal;
    createdAt: Date;
    updatedAt: Date | null;
}