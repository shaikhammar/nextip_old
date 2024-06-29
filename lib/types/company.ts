import { BankAccount } from "./bankaccount";
import { Client } from "./client";
import { Invoice } from "./invoice";
import { Payment } from "./payment";

export type CompanyId = string & { __flavor?: 'CompanyId' };
export interface Company {
  companyId: CompanyId;
  name: string;
  displayName: string | null;
  address: string | null;
  logo: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  isDisabled: boolean;
  disabledAt: Date | null;
  isDeleted: boolean;
  deletedAt: Date | null;
  client?: Client[];
  invoice?: Invoice[];
  payment?: Payment[];
  bankAccount?: BankAccount[];
}
