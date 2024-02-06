import Student from "../../core/entity/student.entity";
import IStudentRepository from "../../core/repository/student.repository";

// implementação de repositório em memória para testes
export class MemoryStudentRepository implements IStudentRepository {
  private students: Student[] = [];

  constructor() {}

  async get(id: string) {
    const student = this.students.find((c) => c.id === id);
    return student ?? null;
  }

  async getAll() {
    return this.students;
  }

  async getByAcademicRecord(academicRecord: string) {
    const student = this.students.find((c) => {
      return c.academicRecord === academicRecord;
    });
    return student ?? null;
  }

  async create(student: Student) {
    this.students.push(student);
    return student;
  }

  async update(id: string, updates: Partial<Student>) {
    this.students = this.students.map((student) => {
      if (student.id === id) {
        return {
          id,
          academicRecord: student.academicRecord,
          documentNumber: student.documentNumber,
          email: updates.email ? updates.email : student.email,
          name: updates.name ? updates.name : student.name,
        };
      }

      return student;
    });

    const student = this.students.find((c) => c.id === id);
    return student as Student;
  }

  async delete(id: string) {
    this.students = this.students.filter((s) => s.id !== id);
  }
}
