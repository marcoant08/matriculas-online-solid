import Student from "../entity/student.entity";

export default interface IGetStudentsUseCase {
  execute: () => Promise<Student[]>;
}
