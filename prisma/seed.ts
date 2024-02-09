import { PrismaClient } from "@prisma/client";
import generateUUID from "../src/utils/functions/generateUUID";

async function main() {
  const userData = {
    id: "30f04d6d-3e70-45bb-8508-58e80655eb2f",
    username: "admin",
    password: "admin",
  };

  const classroomData = [
    {
      id: "5cff8f91-a769-4e1d-bbc2-c09cf5945b65",
      name: "Theory of Games and Economic Behavior",
      teacher: "John von Neumann",
    },
    {
      id: "3eb8be7b-7378-4273-a25b-4f5da696c1a6",
      name: "Clean Architecture: A Craftsman's Guide to Software Structure and Design",
      teacher: "Robert Cecil Martin (Uncle Bob)",
    },
    {
      id: "e7c41805-68b2-4e38-ace1-aa17178f4dc1",
      name: "Mathematical logic",
      teacher: "Alan Turing",
    },
  ];

  const studentData = [
    {
      id: generateUUID(),
      name: "Neymar Jr",
      email: "neymarjr@gmail.com",
      document_number: "00011122001",
      academic_record: "001",
    },
    {
      id: generateUUID(),
      name: "Linus Torvalds",
      email: "torvalds@hotmail.com",
      document_number: "00011122002",
      academic_record: "002",
    },
    {
      id: generateUUID(),
      name: "Ryan Dahl",
      email: "ry@outlook.com",
      document_number: "00011122003",
      academic_record: "003",
    },
    {
      id: generateUUID(),
      name: "Marco Antônio",
      email: "marcoant08@icloud.com",
      document_number: "00011122003",
      academic_record: "004",
    },
  ];

  const prisma = new PrismaClient({});

  const userPromise = prisma.user.create({ data: userData });
  const studentPromise = prisma.student.createMany({ data: studentData });
  const classroomPromise = prisma.classroom.createMany({ data: classroomData });

  await Promise.all([userPromise, studentPromise, classroomPromise])
    .then(() => {
      console.log("[successfully executed]");
    })
    .catch((e) => {
      console.log("[error]", e.message);
    });
}

main();
