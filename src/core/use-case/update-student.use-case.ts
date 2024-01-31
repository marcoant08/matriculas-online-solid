import { UpdateStudentDTO } from "../../application/dto/update-user.dto";
import Student from "../entity/student.entity";

export default interface IUpdateStudentUseCase {
  execute: (id: string, data: UpdateStudentDTO) => Promise<Student>;
}
