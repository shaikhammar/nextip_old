import { getCurrencies } from "@/actions/currency.actions";
import { publicProcedure, router } from "./trpc";
import db from "@/lib/db";

export const appRouter = router({
    getCurrencies: publicProcedure.query(async () => {
        return await db.currency.findMany();
    })
})

export type AppRouter = typeof appRouter;