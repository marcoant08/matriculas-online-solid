import { PrismaClient } from "@prisma/client";
import Student from "../../core/entity/student.entity";
import IStudentRepository from "../../core/repository/student.repository";
import { pgPrismaStudentAdapter } from "../../adapter/pgprisma-student.adapter";
import { prismaClient } from "../../../prisma/client";

export class PGPrismaStudentRepository implements IStudentRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prismaClient;
  }

  async get(id: string) {
    const student = await this.prisma.student.findUnique({ where: { id } });
    return student ? pgPrismaStudentAdapter(student) : null;
  }

  async getAll() {
    const students = await this.prisma.student.findMany({});
    return students.map((student) => pgPrismaStudentAdapter(student));
  }

  async getByAcademicRecord(academicRecord: string) {
    const student = await this.prisma.student.findUnique({
      where: { academic_record: academicRecord },
    });
    return student ? pgPrismaStudentAdapter(student) : null;
  }

  async create(student: Student) {
    await this.prisma.student.create({
      data: {
        id: student.id,
        name: student.name,
        email: student.email,
        academic_record: student.academicRecord,
        document_number: student.documentNumber,
      },
    });
    return student;
  }

  async update(id: string, updates: Partial<Student>) {
    const student = await this.prisma.student.update({
      where: { id },
      data: { ...updates },
    });
    return pgPrismaStudentAdapter(student);
  }

  async delete(id: string) {
    await this.prisma.student.delete({ where: { id } });
  }
}
