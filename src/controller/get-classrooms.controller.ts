import IGetClassroomsUseCase from "../core/use-case/get-classrooms.use-case";
import { ControllerResponse } from "../utils/interfaces";

export class GetClassroomsController {
  constructor(private readonly getClassroomsUseCase: IGetClassroomsUseCase) {}

  async execute(): Promise<ControllerResponse> {
    try {
      const clasrooms = await this.getClassroomsUseCase.execute();

      return {
        statusCode: 200,
        data: {
          success: true,
          message: "Classrooms found successfully",
          clasrooms,
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
