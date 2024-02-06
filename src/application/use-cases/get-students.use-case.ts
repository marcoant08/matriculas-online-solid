import IStudentRepository from "../../core/repository/student.repository";
import IGetStudentsUseCase from "../../core/use-case/get-students.use-case";

export class GetStudentsUseCase implements IGetStudentsUseCase {
  constructor(private readonly studentRepository: IStudentRepository) {}

  async execute() {
    return this.studentRepository.getAll();
  }
}
