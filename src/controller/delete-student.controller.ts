import IDeleteStudentUseCase from "../core/use-case/delete-student.use-case";
import ValidationException from "../utils/exceptions/validation.exception";
import { ControllerProps, ControllerResponse } from "../utils/interfaces";

export class DeleteStudentController {
  constructor(private readonly deleteStudentUseCase: IDeleteStudentUseCase) {}

  async execute(props: ControllerProps): Promise<ControllerResponse> {
    try {
      await this.validate(props);

      const studentId = props.params?.path?.studentId as string;
      await this.deleteStudentUseCase.execute(studentId);

      return {
        statusCode: 200,
        data: {
          success: true,
          message: "Student deleted successfully",
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
    const studentId = props.params?.path?.studentId as string;

    if (!studentId) {
      throw new ValidationException("studentId is missing");
    }
  }
}
