import { MemoryStudentRepository } from "../../infra/repository/memory.student.repository";
import { CreateStudentUseCase } from "./create-student.use-case";
import { DeleteStudentUseCase } from "./delete-student.use-case";

describe("Delete student use case", () => {
  it("should to be able to delete a student", async () => {
    const studentRepository = new MemoryStudentRepository();

    const createStudent = new CreateStudentUseCase(studentRepository);

    const student = await createStudent.execute({
      name: "Fulano de Tal",
      academicRecord: "00008",
      documentNumber: "76157267003",
      email: "fulano@gmail.com",
    });

    const sut = new DeleteStudentUseCase(studentRepository);

    const studentId = student.id;
    const promise = sut.execute(studentId);
    await expect(promise).resolves.toBeUndefined();
  });

  it("should not delete a student that does not exist", async () => {
    const studentRepository = new MemoryStudentRepository();

    const createStudent = new CreateStudentUseCase(studentRepository);

    const student = await createStudent.execute({
      name: "Fulano de Tal",
      academicRecord: "00008",
      documentNumber: "76157267003",
      email: "fulano@gmail.com",
    });

    const sut = new DeleteStudentUseCase(studentRepository);

    // deleta aluno
    const studentId = student.id;
    await sut.execute(studentId);

    // deleta novamente
    const promise = sut.execute(studentId);
    await expect(promise).rejects.toThrow("Student not found");
  });
});
