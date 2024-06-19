"use server"

import db from "@/lib/db"

export interface Company {
    companyId: number,
    name: string,
    displayName: string | null,
    address: string | null,
    logo: string | null,
    createdAt: Date | null,
    updatedAt: Date | null,
    isDisabled: boolean,
    disabledAt: Date | null,
    isDeleted: boolean,
    deletedAt: Date | null
}

interface ActionResult {
    error?: string;
    companies?: Array<Company>;
}

export async function getCompanies(): Promise<ActionResult> {
    let companies: Company[]
    try {
        companies = await db.company.findMany()
    } catch (error: any) {
        return {
            error: error.message //"Error fetching companies. Please try again after sometime."
        }
    }
    return {
        companies: companies
    }
}