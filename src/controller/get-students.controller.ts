import IGetStudentsUseCase from "../core/use-case/get-students.use-case";
import { ControllerResponse } from "../utils/interfaces";

export class GetStudentsController {
  constructor(private readonly getStudentsUseCase: IGetStudentsUseCase) {}

  async execute(): Promise<ControllerResponse> {
    try {
      const students = await this.getStudentsUseCase.execute();

      return {
        statusCode: 200,
        data: {
          success: true,
          message: "Students found successfully",
          students,
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
