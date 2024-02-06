import { UpdateStudentDTO } from "../../application/dto/update-student.dto";
import Student from "../entity/student.entity";

export default interface IUpdateStudentUseCase {
  execute: (id: string, data: UpdateStudentDTO) => Promise<Student>;
}
