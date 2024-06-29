import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {

    const companies = await prisma.company.createMany({
        data: [
            { name: "Ahmed Manzoor", displayName: "Ahmed Manzoor" },
            { name: "Ammar Shaikh", displayName: "Ammar Shaikh" },
            { name: "Optimus Language Solutions", displayName: "Optimus Language Solutions" },
            { name: "NextIP", displayName: "NextIP" },
        ]
    })

    const ahmedId = await prisma.company.findUnique({ where: { name: "Ahmed Manzoor" } })


    const currencies = await prisma.currency.createMany({
        data: [
            { code: "USD", name: "US Dollar" },
            { code: "EUR", name: "Euro" },
            { code: "INR", name: "Indian Rupee" },
            { code: "GBP", name: "British Pound" },
        ]
    })

    const usdId = await prisma.currency.findUnique({ where: { code: "USD" }, select: { currencyId: true } })
    const gbpId = await prisma.currency.findUnique({ where: { code: "GBP" }, select: { currencyId: true } })

    const clients = await prisma.client.createMany({
        data: [
            {
                name: "ICON Clinical Research UK Ltd",
                code: "ICON",
                address: "Language Services Group",
                email: "IconUKTranslationInvoices@iconplc.com",
                currencyId: usdId?.currencyId!,
                companyId: ahmedId?.companyId!
            },
            {
                name: "Absolute Interpreting and Translations Ltd",
                code: "AIT",
                address: "Absolute House 46 Hylton St | Jewellery Quarter",
                email: "Enquiries@absolute-interpreting.co.uk",
                currencyId: gbpId?.currencyId!,
                companyId: ahmedId?.companyId!
            },
        ]
    })

    const bankAccounts = await prisma.bankAccount.createMany({
        data: [
            {
                type: "Checking",
                name: "MTB-Ahmed",
                code: "MTBA",
                openingBalance: 0,
                balance: 0,
                currencyId: usdId?.currencyId!,
                companyId: ahmedId?.companyId!
            },
        ]
    })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })