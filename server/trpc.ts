import { initTRPC } from "@trpc/server";
import transformer from 'trpc-transformer';

const t = initTRPC.create({ transformer });

export const router = t.router;
export const publicProcedure = t.procedure;
