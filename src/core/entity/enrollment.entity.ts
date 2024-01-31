import generateUUID from "../../utils/functions/generateUUID";
import { EnrollmentProps } from "../../utils/interfaces";

export default class Enrollment {
  id: string;
  studentId: string;
  classroomId: string;

  constructor({ studentId, classroomId }: EnrollmentProps, id?: string) {
    this.id = id ?? generateUUID();
    this.studentId = studentId;
    this.classroomId = classroomId;
  }
}
