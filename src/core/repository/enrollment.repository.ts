import Enrollment from "../entity/enrollment.entity";

export default interface IEnrollmentRepository {
  get: (id: string) => Promise<Enrollment | null>;
  getByClassroomId: (classroomId: string) => Promise<Enrollment[]>;
  getByClassroomAndStudent: (
    classroomId: string,
    studentId: string
  ) => Promise<Enrollment | null>;
  create: (enrollment: Enrollment) => Promise<Enrollment>;
  delete: (id: string) => Promise<void>;
}
