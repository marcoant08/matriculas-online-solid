import Classroom from "../entity/classroom.entity";

export default interface IClassroomRepository {
  get: (id: string) => Promise<Classroom | null>;
  getAll: () => Promise<Classroom[]>;
}
