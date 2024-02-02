import Enrollment from "../../core/entity/enrollment.entity";
import IEnrollmentRepository from "../../core/repository/enrollment.repository";

// implementação de repositório em memória para testes
export class MemoryEnrollmentRepository implements IEnrollmentRepository {
  private enrollments: Enrollment[] = [];

  constructor() {}

  async get(enrollmentId: string) {
    const enrollment = this.enrollments.find((c) => {
      return c.id === enrollmentId;
    });
    return enrollment ?? null;
  }

  async getByClassroomId(classroomId: string) {
    const enrollment = this.enrollments.filter((c) => {
      return c.classroomId === classroomId;
    });
    return enrollment;
  }

  async getByClassroomAndStudent(classroomId: string, studentId: string) {
    const enrollment = this.enrollments.find((c) => {
      return c.classroomId === classroomId && c.studentId === studentId;
    });
    return enrollment ?? null;
  }

  async create(enrollment: Enrollment) {
    this.enrollments.push(enrollment);
    return enrollment;
  }

  async delete(id: string) {
    this.enrollments = this.enrollments.filter((s) => s.id !== id);
  }
}
