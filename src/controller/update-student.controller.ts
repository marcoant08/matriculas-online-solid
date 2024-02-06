import { UpdateStudentDTO } from "../application/dto/update-student.dto";
import IUpdateStudentUseCase from "../core/use-case/update-student.use-case";
import ValidationException from "../utils/exceptions/validation.exception";
import { ControllerProps, ControllerResponse } from "../utils/interfaces";
import { validateUpdateStudentRequest } from "../utils/validations/update-student.validation";

export class UpdateStudentController {
  constructor(private readonly updateStudentUseCase: IUpdateStudentUseCase) {}

  async execute(props: ControllerProps): Promise<ControllerResponse> {
    try {
      await this.validate(props);

      const data: UpdateStudentDTO = {};
      if (props.body.name) data["name"] = props.body.name;
      if (props.body.email) data["email"] = props.body.email;

      const student = await this.updateStudentUseCase.execute(
        props.params?.path?.studentId as string,
        data
      );

      return {
        statusCode: 200,
        data: {
          success: true,
          message: "Student updated successfully",
          student,
        },
      };
    } catch (e: any) {
      return {
        statusCode: e.statusCode || 500,
        data: {
          success: false,
          message: e.message || "Internal Server Error",
        },
      };
    }
  }

  async validate(props: ControllerProps) {
    await validateUpdateStudentRequest(props);

    // body deve ter pelo menos um dos campos atualizáveis
    if (props.body.name && !props.body.email) {
      throw new ValidationException("No valid fields were submitted");
    }
  }
}
