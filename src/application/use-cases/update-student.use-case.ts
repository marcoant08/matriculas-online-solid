import { UpdateStudentDTO } from "../dto/update-student.dto";
import Student from "../../core/entity/student.entity";
import IStudentRepository from "../../core/repository/student.repository";
import IUpdateStudentUseCase from "../../core/use-case/update-student.use-case";
import NotFoundException from "../../utils/exceptions/not-found.exception";
import ValidationException from "../../utils/exceptions/validation.exception";

export class UpdateStudentUseCase implements IUpdateStudentUseCase {
  constructor(private readonly studentRepository: IStudentRepository) {}

  async execute(id: string, data: UpdateStudentDTO) {
    if (Object.keys(data).length === 0) {
      // valida de pelo menos um campo foi recebido para alteração
      throw new ValidationException("No valid fields were submitted");
    }

    // busca aluno que será alterado
    const student = await this.studentRepository.get(id);

    if (!student) {
      // não prossegue, caso aluno não exista
      throw new NotFoundException("Student not found");
    }

    const studentUpdates: Partial<Student> = {}; // cria updates sem nenhum campo
    if (data.email) studentUpdates["email"] = data.email;
    if (data.name) studentUpdates["name"] = data.name;

    return this.studentRepository.update(id, studentUpdates);
  }
}
