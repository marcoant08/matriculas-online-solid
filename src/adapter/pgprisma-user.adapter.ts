import { User as PrismaUser } from "@prisma/client";
import User from "../core/entity/user.entity";

export const pgPrismaUserAdapter = (user: PrismaUser) => {
  return new User(
    { username: user.username, password: user.password },
    user.id
  );
};
