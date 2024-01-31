import Enrollment from "../../core/entity/enrollment.entity";
import IEnrollmentRepository from "../../core/repository/enrollment.repository";

// implementação de repositório em memória para testes
export class MemoryEnrollmentRepository implements IEnrollmentRepository {
  private enrollments: Enrollment[] = [];

  constructor() {}

  async getByClassroomId(classroomId: string) {
    const classroom = this.enrollments.filter((c) => {
      return c.classroomId === classroomId;
    });
    return classroom;
  }

  async getByClassroomAndStudent(classroomId: string, studentId: string) {
    const classroom = this.enrollments.find((c) => {
      return c.classroomId === classroomId && c.studentId === studentId;
    });
    return classroom ?? null;
  }

  async create(enrollment: Enrollment) {
    this.enrollments.push(enrollment);
    return enrollment;
  }

  async delete(id: string) {
    this.enrollments = this.enrollments.filter((s) => s.id !== id);
  }
}
