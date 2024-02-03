import IGetEnrollmentsFromClassroomUseCase from "../core/use-case/get-enrollments-from-classroom.use-case";
import ValidationException from "../utils/exceptions/validation.exception";
import { ControllerProps, ControllerResponse } from "../utils/interfaces";

export class GetEnrollmentsFromClassroomController {
  constructor(
    private readonly getEnrollmentsFromClassroomUseCase: IGetEnrollmentsFromClassroomUseCase
  ) {}

  async execute(props: ControllerProps): Promise<ControllerResponse> {
    try {
      const classroomId = props.params?.path?.classroomId as string;

      if (!classroomId) {
        throw new ValidationException("classroomId is missing");
      }

      const enrollments = await this.getEnrollmentsFromClassroomUseCase.execute(
        classroomId
      );

      return {
        statusCode: 200,
        data: {
          success: true,
          message: "Enrollments found successfully",
          enrollments,
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
