import Enrollment from "../../core/entity/enrollment.entity";
import IClassroomRepository from "../../core/repository/classroom.repository";
import IEnrollmentRepository from "../../core/repository/enrollment.repository";
import IStudentRepository from "../../core/repository/student.repository";
import ICreateEnrollmentUseCase from "../../core/use-case/create-enrollment.use-case";
import AlreadyExistsException from "../../utils/exceptions/already-exists.exception";
import NotFoundException from "../../utils/exceptions/not-found.exception";
import { CreateEnrollmentDTO } from "../dto/create-enrollment.dto";

export class CreateEnrollmentUseCase implements ICreateEnrollmentUseCase {
  constructor(
    private readonly studentRepository: IStudentRepository,
    private readonly classroomRepository: IClassroomRepository,
    private readonly enrollmentRepository: IEnrollmentRepository
  ) {}

  async execute(data: CreateEnrollmentDTO) {
    const classroom = await this.classroomRepository.get(data.classroomId);

    if (!classroom) {
      // não prossegue, caso turma online não exista
      throw new NotFoundException("Classroom not found");
    }

    const student = await this.studentRepository.get(data.studentId);

    if (!student) {
      // não prossegue, caso aluno não exista
      throw new NotFoundException("Student not found");
    }

    const existsEnrollment =
      await this.enrollmentRepository.getByClassroomAndStudent(
        data.classroomId,
        data.studentId
      );

    if (existsEnrollment) {
      throw new AlreadyExistsException("Enrollment already exists");
    }

    const enrollment = new Enrollment({
      classroomId: data.classroomId,
      studentId: data.studentId,
    });

    return this.enrollmentRepository.create(enrollment);
  }
}
