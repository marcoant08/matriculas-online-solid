import Enrollment from "../entity/enrollment.entity";

export default interface IGetEnrollmentsFromClassroomUseCase {
  execute: (classroomId: string) => Promise<Enrollment[]>;
}
