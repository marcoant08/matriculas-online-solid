import { PrismaClient } from "@prisma/client";
import Enrollment from "../../core/entity/enrollment.entity";
import IEnrollmentRepository from "../../core/repository/enrollment.repository";
import { pgPrismaEnrollmentAdapter } from "../../adapter/pgprisma-enrollment.adapter";

export class PGPrismaEnrollmentRepository implements IEnrollmentRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient({});
  }

  async get(id: string) {
    const enrollment = await this.prisma.enrollment.findUnique({
      where: { id },
    });
    return enrollment ? pgPrismaEnrollmentAdapter(enrollment) : null;
  }

  async getByClassroomId(classroomId: string) {
    const enrollments = await this.prisma.enrollment.findMany({
      where: {
        classroom_id: classroomId,
      },
    });

    return enrollments.map((enrollment) => {
      return pgPrismaEnrollmentAdapter(enrollment);
    });
  }

  async getByClassroomAndStudent(classroomId: string, studentId: string) {
    const enrollment = await this.prisma.enrollment.findFirst({
      where: {
        AND: [{ classroom_id: classroomId }, { student_id: studentId }],
      },
    });

    return enrollment ? pgPrismaEnrollmentAdapter(enrollment) : null;
  }

  async create(enrollment: Enrollment) {
    await this.prisma.enrollment.create({
      data: {
        id: enrollment.id,
        classroom_id: enrollment.classroomId,
        student_id: enrollment.studentId,
      },
    });
    return enrollment;
  }

  async delete(id: string) {
    await this.prisma.enrollment.delete({ where: { id } });
  }
}
