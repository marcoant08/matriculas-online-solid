import IEnrollmentRepository from "../../core/repository/enrollment.repository";
import IDeleteEnrollmentUseCase from "../../core/use-case/delete-enrollment.use-case";
import NotFoundException from "../../utils/exceptions/not-found.exception";

export class DeleteEnrollmentUseCase implements IDeleteEnrollmentUseCase {
  constructor(private readonly enrollmentRepository: IEnrollmentRepository) {}

  async execute(enrollmentId: string) {
    // busca aluno que será excluído
    const enrollment = await this.enrollmentRepository.get(enrollmentId);

    if (!enrollment) {
      // não prossegue, caso aluno não exista
      throw new NotFoundException("Enrollment not found");
    }

    await this.enrollmentRepository.delete(enrollmentId);
  }
}
