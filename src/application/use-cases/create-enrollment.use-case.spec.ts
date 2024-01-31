import Student from "../../core/entity/student.entity";
import { MemoryClassroomRepository } from "../../infra/repository/memory.classroom.repository";
import { MemoryEnrollmentRepository } from "../../infra/repository/memory.enrollment.repository";
import { MemoryStudentRepository } from "../../infra/repository/memory.student.repository";
import { CreateEnrollmentUseCase } from "./create-enrollment.use-case";

describe("Create student enrollment use case", () => {
  it("should to be able to create a new student enrollment", async () => {
    const studentRepository = new MemoryStudentRepository();
    const classroomRepository = new MemoryClassroomRepository();
    const enrollmentRepository = new MemoryEnrollmentRepository();

    // cria estudante
    const student = await studentRepository.create(
      new Student({
        name: "Fulano de Tal",
        academicRecord: "00008",
        documentNumber: "76157267003",
        email: "fulano@gmail.com",
      })
    );

    // matricula estudante em turma online
    const sut = new CreateEnrollmentUseCase(
      studentRepository,
      classroomRepository,
      enrollmentRepository
    );

    const response = await sut.execute({
      classroomId: "e7c41805-68b2-4e38-ace1-aa17178f4dc1",
      studentId: student.id,
    });

    expect(response).toBeTruthy();
  });

  it("should not create a enrollment that already exists", async () => {
    const studentRepository = new MemoryStudentRepository();
    const classroomRepository = new MemoryClassroomRepository();
    const enrollmentRepository = new MemoryEnrollmentRepository();

    // cria estudante
    const student = await studentRepository.create(
      new Student({
        name: "Fulano de Tal",
        academicRecord: "00008",
        documentNumber: "76157267003",
        email: "fulano@gmail.com",
      })
    );

    const sut = new CreateEnrollmentUseCase(
      studentRepository,
      classroomRepository,
      enrollmentRepository
    );

    // cria matrícula
    await sut.execute({
      classroomId: "e7c41805-68b2-4e38-ace1-aa17178f4dc1",
      studentId: student.id,
    });

    // tenta criar a mesma matrícula novamente
    const promise = sut.execute({
      classroomId: "e7c41805-68b2-4e38-ace1-aa17178f4dc1",
      studentId: student.id,
    });

    await expect(promise).rejects.toThrow("Enrollment already exists");
  });

  it("should not create an enrollment for a student that does not exist", async () => {
    const studentRepository = new MemoryStudentRepository();
    const classroomRepository = new MemoryClassroomRepository();
    const enrollmentRepository = new MemoryEnrollmentRepository();

    const sut = new CreateEnrollmentUseCase(
      studentRepository,
      classroomRepository,
      enrollmentRepository
    );

    // cria matrícula
    const promise = sut.execute({
      classroomId: "e7c41805-68b2-4e38-ace1-aa17178f4dc1",
      studentId: "null",
    });

    await expect(promise).rejects.toThrow("Student not found");
  });

  it("should not create an enrollment for a classroom that does not exist", async () => {
    const studentRepository = new MemoryStudentRepository();
    const classroomRepository = new MemoryClassroomRepository();
    const enrollmentRepository = new MemoryEnrollmentRepository();

    const sut = new CreateEnrollmentUseCase(
      studentRepository,
      classroomRepository,
      enrollmentRepository
    );

    // cria matrícula
    const promise = sut.execute({
      classroomId: "null",
      studentId: "1c192b7d-f5a9-462a-8a58-6c4d2032ce80",
    });

    await expect(promise).rejects.toThrow("Classroom not found");
  });
});
