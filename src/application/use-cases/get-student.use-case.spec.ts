import { MemoryClassroomRepository } from "../../infra/repository/memory.classroom.repository";
import { MemoryEnrollmentRepository } from "../../infra/repository/memory.enrollment.repository";
import { MemoryStudentRepository } from "../../infra/repository/memory.student.repository";
import { CreateStudentUseCase } from "./create-student.use-case";
import { GetEnrollmentsFromClassroomUseCase } from "./get-enrollments-from-classroom.use-case";
import { GetStudentUseCase } from "./get-student.use-case";

describe("Get student use case", () => {
  it("should to be able to get student", async () => {
    const studentRepository = new MemoryStudentRepository();

    const createStudent = new CreateStudentUseCase(studentRepository);

    const student = await createStudent.execute({
      name: "Fulano de Tal",
      academicRecord: "00008",
      documentNumber: "76157267003",
      email: "fulano@gmail.com",
    });

    const sut = new GetStudentUseCase(studentRepository);

    const response = await sut.execute(student.id);

    expect(response).toBeTruthy();
  });

  it("should not get a student who does not exist", async () => {
    const studentRepository = new MemoryStudentRepository();

    const sut = new GetStudentUseCase(studentRepository);

    const promise = sut.execute("null");

    await expect(promise).rejects.toThrow("Student not found");
  });
});
