import { PrismaClient } from "@prisma/client";
import IClassroomRepository from "../../core/repository/classroom.repository";
import { pgPrismaClassroomAdapter } from "../../adapter/pgprisma-classroom.adapter";

export class PGPrismaClassroomRepository implements IClassroomRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient({});
  }

  async get(id: string) {
    const classroom = await this.prisma.classroom.findUnique({
      where: { id },
    });
    return classroom ? pgPrismaClassroomAdapter(classroom) : null;
  }

  async getAll() {
    const clasrooms = await this.prisma.classroom.findMany({});
    return clasrooms.map((enrollment) => pgPrismaClassroomAdapter(enrollment));
  }
}
