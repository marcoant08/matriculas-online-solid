import Classroom from "../entity/classroom.entity";

export default interface IGetClassroomsUseCase {
  execute: () => Promise<Classroom[]>;
}
