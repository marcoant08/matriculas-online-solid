import IDeleteEnrollmentUseCase from "../core/use-case/delete-enrollment.use-case";
import ValidationException from "../utils/exceptions/validation.exception";
import { ControllerProps, ControllerResponse } from "../utils/interfaces";

export class DeleteEnrollmentController {
  constructor(
    private readonly deleteEnrollmentUseCase: IDeleteEnrollmentUseCase
  ) {}

  async execute(props: ControllerProps): Promise<ControllerResponse> {
    try {
      const enrollmentId = props.params?.path?.enrollmentId as string;

      if (!enrollmentId) {
        throw new ValidationException("enrollmentId is missing");
      }

      await this.deleteEnrollmentUseCase.execute(enrollmentId);

      return {
        statusCode: 200,
        data: {
          success: true,
          message: "Enrollment deleted successfully",
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
}
