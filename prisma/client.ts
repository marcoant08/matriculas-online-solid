import { PrismaClient } from "@prisma/client";
// todos os repositórios devem usar a mesma instância
export const prismaClient = new PrismaClient({});
