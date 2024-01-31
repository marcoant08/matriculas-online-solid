import { MemoryStudentRepository } from "../../infra/repository/memory.student.repository";
import { CreateStudentUseCase } from "./create-student.use-case";

describe("Create student use case", () => {
  it("should to be able to create a new student", async () => {
    const studentRepository = new MemoryStudentRepository();

    const sut = new CreateStudentUseCase(studentRepository);

    const response = await sut.execute({
      name: "Fulano de Tal",
      academicRecord: "00008",
      documentNumber: "76157267003",
      email: "fulano@gmail.com",
    });

    expect(response).toBeTruthy();
  });

  it("should not create a student with an existing academic record", async () => {
    const studentRepository = new MemoryStudentRepository();

    const sut = new CreateStudentUseCase(studentRepository);

    // cria aluno
    await sut.execute({
      name: "Fulano de Tal",
      academicRecord: "00008",
      documentNumber: "76157267003",
      email: "fulano@gmail.com",
    });

    // cria outro aluno com o mesmo registro acadêmico
    const promise = sut.execute({
      name: "Ciclano de Tal",
      academicRecord: "00008", // registro acadêmico repetido
      documentNumber: "99456080021",
      email: "ciclano@gmail.com",
    });

    await expect(promise).rejects.toThrow(
      "There is already a student with this academic record"
    );
  });
});
