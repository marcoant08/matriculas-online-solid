import IStudentRepository from "../../core/repository/student.repository";
import IGetStudentUseCase from "../../core/use-case/get-student.use-case";
import NotFoundException from "../../utils/exceptions/not-found.exception";

export class GetStudentUseCase implements IGetStudentUseCase {
  constructor(private readonly studentRepository: IStudentRepository) {}

  async execute(studentId: string) {
    const student = await this.studentRepository.get(studentId);
    if (!student) throw new NotFoundException("Student not found");
    return student;
  }
}
