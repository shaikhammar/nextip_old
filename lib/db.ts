import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export default db

export const adapter = new PrismaAdapter(db.session, db.user);