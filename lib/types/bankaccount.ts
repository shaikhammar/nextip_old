import { Prisma } from '@prisma/client'
import { Currency, CurrencyId } from './currency';
import { Payment } from './payment';
import { Company, CompanyId } from './company';

export type BankAccountId = string & { __flavor?: 'BankAccountId' };

export interface BankAccount {
    bankAccountId: BankAccountId
    type?: BankAccountType | BankAccountType.Checking
    name: string
    code: string
    openingBalance: Prisma.Decimal
    balance: Prisma.Decimal
    isDisabled: boolean
    disabledAt: Date | null
    createdAt: Date
    updatedAt: Date | null
    payment?: Payment[]
    companyId: CompanyId
    company?: Company
    currencyId: CurrencyId
    currency?: Currency
}

export enum BankAccountType {
    Checking = 'Checking',
    Savings = 'Savings',
    Paypal = 'Paypal',
    Venmo = 'Venmo',
    Other = 'Other'
}