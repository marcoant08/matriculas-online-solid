import { PrismaClient } from "@prisma/client";
import IClassroomRepository from "../../core/repository/classroom.repository";
import { pgPrismaClassroomAdapter } from "../../adapter/pgprisma-classroom.adapter";
import { prismaClient } from "../../../prisma/client";

export class PGPrismaClassroomRepository implements IClassroomRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prismaClient;
  }

  async get(id: string) {
    const classroom = await this.prisma.classroom.findUnique({
      where: { id },
    });
    return classroom ? pgPrismaClassroomAdapter(classroom) : null;
  }

  async getAll() {
    const classrooms = await this.prisma.classroom.findMany({});
    return classrooms.map((enrollment) => pgPrismaClassroomAdapter(enrollment));
  }
}
