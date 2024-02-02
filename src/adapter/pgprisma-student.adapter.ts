import { Student as PrismaStudent } from "@prisma/client";
import Student from "../core/entity/student.entity";

export const pgPrismaStudentAdapter = (student: PrismaStudent) => {
  return new Student(
    {
      name: student.name,
      email: student.email,
      academicRecord: student.academic_record,
      documentNumber: student.document_number,
    },
    student.id
  );
};
