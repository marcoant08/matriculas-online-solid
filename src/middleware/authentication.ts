import { NextFunction, Request, Response } from "express";
import { PGPrismaUserRepository } from "../infra/repository/pgprisma.user.repository";

// implementação de Basic Authorization
export const authenticationMiddleware = async (
  { headers }: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // verifica recebimento correto de authorization
    if (!headers) throw new Error();
    if (!headers.authorization) throw new Error();
    if (typeof headers.authorization !== "string") throw new Error();

    const [type, token] = headers.authorization.split(" ");

    if (type !== "Basic") throw new Error();
    if (!token) throw new Error();

    // decodifica username e password
    const credentials = Buffer.from(token, "base64").toString("utf-8");
    const [username, password] = credentials.split(":");

    if (!username || !password) throw new Error();

    // busca user na base de dados e valida password
    const userRepository = new PGPrismaUserRepository();
    const user = await userRepository.getByUsername(username);

    if (!user) throw new Error();
    if (password !== user.password) throw new Error();

    next();
  } catch (e: any) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};
