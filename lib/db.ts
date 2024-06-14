import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";

// const db = new PrismaClient();

// export default db


const prismaClientSingleton = () => {
    return new PrismaClient()
}

declare const globalThis: {
    prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const db = globalThis.prismaGlobal ?? prismaClientSingleton()

export default db

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = db

export const adapter = new PrismaAdapter(db.session, db.user);