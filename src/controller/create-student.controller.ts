import ICreateStudentUseCase from "../core/use-case/create-student.use-case";
import { ControllerProps, ControllerResponse } from "../utils/interfaces";
import { validateCreateStudentRequest } from "../utils/validations/create-student.validation";

export class CreateStudentController {
  constructor(private readonly createStudentUseCase: ICreateStudentUseCase) {}

  async execute(props: ControllerProps): Promise<ControllerResponse> {
    try {
      await validateCreateStudentRequest(props.body);

      const data = {
        name: props.body.name,
        email: props.body.email,
        academicRecord: props.body.academicRecord,
        documentNumber: props.body.documentNumber,
      };

      const student = await this.createStudentUseCase.execute(data);

      return {
        statusCode: 201,
        data: {
          message: "Student created successfully",
          student,
        },
      };
    } catch (e: any) {
      return {
        statusCode: e.statusCode || 500,
        data: { message: e.message || "Internal Server Error" },
      };
    }
  }
}