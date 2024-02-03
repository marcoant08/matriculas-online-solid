import { Classroom as PrismaClassroom } from "@prisma/client";
import Classroom from "../core/entity/classroom.entity";

export const pgPrismaClassroomAdapter = (classroom: PrismaClassroom) => {
  return new Classroom(
    { name: classroom.name, teacher: classroom.teacher },
    classroom.id
  );
};
