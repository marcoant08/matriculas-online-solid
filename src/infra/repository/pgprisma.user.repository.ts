import { PrismaClient } from "@prisma/client";
import IUserRepository from "../../core/repository/user.repository";
import { pgPrismaUserAdapter } from "../../adapter/pgprisma-user.adapter";

export class PGPrismaUserRepository implements IUserRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient({});
  }

  async getByUsername(username: string) {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });
    return user ? pgPrismaUserAdapter(user) : null;
  }
}
