import { Prisma } from "@prisma/client";
import { publicProcedure, router } from "./trpc";
import db from "@/lib/db";
import { Client } from "@/lib/types/client";

export const appRouter = router({
    getCurrencies: publicProcedure.query(async () => {
        return await db.currency.findMany();
    }),
    getClients: publicProcedure.query(async () => {
        const clientList = await db.client.findMany();
        const clients: Client[] = [...clientList.map(client => {
            return {
                ...client,
                balance: new Prisma.Decimal(client.balance)
            }
        })];

        return clients
    })
})

export type AppRouter = typeof appRouter;