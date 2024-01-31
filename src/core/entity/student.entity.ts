import generateUUID from "../../utils/functions/generateUUID";
import { StudentProps } from "../../utils/interfaces";

export default class Student {
  id: string;
  name: string;
  email: string;
  academicRecord: string;
  documentNumber: string;

  constructor(
    { name, email, academicRecord, documentNumber }: StudentProps,
    id?: string
  ) {
    this.id = id ?? generateUUID();
    this.name = name;
    this.email = email;
    this.academicRecord = academicRecord;
    this.documentNumber = documentNumber;
  }
}
