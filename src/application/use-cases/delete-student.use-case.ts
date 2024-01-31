import IStudentRepository from "../../core/repository/student.repository";
import IDeleteStudentUseCase from "../../core/use-case/delete-student.use-case";
import NotFoundException from "../../utils/exceptions/not-found.exception";

export class DeleteStudentUseCase implements IDeleteStudentUseCase {
  constructor(private readonly studentRepository: IStudentRepository) {}

  async execute(studentId: string) {
    // busca aluno que será excluído
    const student = await this.studentRepository.get(studentId);

    if (!student) {
      // não prossegue, caso aluno não exista
      throw new NotFoundException("Student not found");
    }

    await this.studentRepository.delete(studentId);
  }
}
