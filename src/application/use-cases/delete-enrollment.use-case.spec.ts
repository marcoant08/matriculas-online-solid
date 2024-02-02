import Student from "../../core/entity/student.entity";
import { MemoryClassroomRepository } from "../../infra/repository/memory.classroom.repository";
import { MemoryEnrollmentRepository } from "../../infra/repository/memory.enrollment.repository";
import { MemoryStudentRepository } from "../../infra/repository/memory.student.repository";
import { CreateEnrollmentUseCase } from "./create-enrollment.use-case";

describe("Delete enrollment use case", () => {
  it("should to be able to delete a enrollment", async () => {
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

    const classroomId = "e7c41805-68b2-4e38-ace1-aa17178f4dc1";
    const response = await sut.execute({
      classroomId: classroomId,
      studentId: student.id,
    });

    expect(response).toBeTruthy();
  });

  it("should not delete a enrollment that does not exist", async () => {
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

    const classroomId = "e7c41805-68b2-4e38-ace1-aa17178f4dc1";

    await sut.execute({ classroomId: classroomId, studentId: student.id });

    const promise = sut.execute({
      classroomId: classroomId,
      studentId: student.id,
    });
    await expect(promise).rejects.toThrow("Enrollment already exists");
  });
});
