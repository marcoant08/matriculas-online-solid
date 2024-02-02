import { Enrollment as PrismaEnrollment } from "@prisma/client";
import Enrollment from "../core/entity/enrollment.entity";

export const pgPrismaEnrollmentAdapter = (enrollment: PrismaEnrollment) => {
  return new Enrollment(
    {
      classroomId: enrollment.classroom_id,
      studentId: enrollment.student_id,
    },
    enrollment.id
  );
};
