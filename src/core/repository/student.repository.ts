import Student from "../entity/student.entity";

export default interface IStudentRepository {
  get: (id: string) => Promise<Student | null>;
  getByAcademicRecord: (id: string) => Promise<Student | null>;
  create: (student: Student) => Promise<Student>;
  update: (id: string, updates: Partial<Student>) => Promise<Student>;
  delete: (id: string) => Promise<void>;
}
