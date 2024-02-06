import Student from "../entity/student.entity";

export default interface IGetStudentUseCase {
  execute: (studentId: string) => Promise<Student | null>;
}
