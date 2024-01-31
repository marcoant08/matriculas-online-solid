import { CreateStudentDTO } from "../../application/dto/create-student.dto";
import Student from "../entity/student.entity";

export default interface ICreateStudentUseCase {
  execute: (data: CreateStudentDTO) => Promise<Student>;
}
