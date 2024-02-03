import IClassroomRepository from "../../core/repository/classroom.repository";
import IEnrollmentRepository from "../../core/repository/enrollment.repository";
import IGetEnrollmentsFromClassroomUseCase from "../../core/use-case/get-enrollments-from-classroom.use-case";
import NotFoundException from "../../utils/exceptions/not-found.exception";

export class GetEnrollmentsFromClassroomUseCase
  implements IGetEnrollmentsFromClassroomUseCase
{
  constructor(
    private readonly classroomRepository: IClassroomRepository,
    private readonly enrollmentRepository: IEnrollmentRepository
  ) {}

  async execute(classroomId: string) {
    const classroom = await this.classroomRepository.get(classroomId);

    if (!classroom) {
      // não prossegue, caso turma não exista
      throw new NotFoundException("Classroom not found");
    }

    return this.enrollmentRepository.getByClassroomId(classroomId);
  }
}
