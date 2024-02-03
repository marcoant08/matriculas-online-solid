import ICreateEnrollmentUseCase from "../core/use-case/create-enrollment.use-case";
import { ControllerProps, ControllerResponse } from "../utils/interfaces";
import { validateCreateEnrollmentRequest } from "../utils/validations/create-enrollment.validation";

export class CreateEnrollmentController {
  constructor(
    private readonly createEnrollmentUseCase: ICreateEnrollmentUseCase
  ) {}

  async execute(props: ControllerProps): Promise<ControllerResponse> {
    try {
      await this.validate(props);

      const data = {
        studentId: props.body.studentId,
        classroomId: props.body.classroomId,
      };

      const enrollment = await this.createEnrollmentUseCase.execute(data);

      return {
        statusCode: 201,
        data: {
          success: true,
          message: "Enrollment created successfully",
          enrollment,
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
    await validateCreateEnrollmentRequest(props);
  }
}
