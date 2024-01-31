import { CreateEnrollmentDTO } from "../../application/dto/create-enrollment.dto";
import Enrollment from "../entity/enrollment.entity";

export default interface ICreateEnrollmentUseCase {
  execute: (data: CreateEnrollmentDTO) => Promise<Enrollment>;
}
