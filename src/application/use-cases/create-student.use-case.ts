import { CreateStudentDTO } from "../dto/create-student.dto";
import Student from "../../core/entity/student.entity";
import IStudentRepository from "../../core/repository/student.repository";
import ICreateStudentUseCase from "../../core/use-case/create-student.use-case";
import AlreadyExistsException from "../../utils/exceptions/already-exists.exception";

export class CreateStudentUseCase implements ICreateStudentUseCase {
  constructor(private readonly studentRepository: IStudentRepository) {}

  async execute(data: CreateStudentDTO) {
    const existsStudent = await this.studentRepository.getByAcademicRecord(
      data.academicRecord
    );

    if (existsStudent) {
      throw new AlreadyExistsException(
        "There is already a student with this academic record"
      );
    }

    const student = new Student(data);
    return this.studentRepository.create(student);
  }
}
