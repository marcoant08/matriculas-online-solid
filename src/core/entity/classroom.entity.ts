import generateUUID from "../../utils/functions/generateUUID";
import { ClassroomProps } from "../../utils/interfaces";

export default class Classroom {
  id: string;
  name: string;
  teacher: string;

  constructor({ name, teacher }: ClassroomProps, id?: string) {
    this.id = id ?? generateUUID();
    this.name = name;
    this.teacher = teacher;
  }
}
