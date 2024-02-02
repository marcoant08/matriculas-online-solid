import { MemoryStudentRepository } from "../../infra/repository/memory.student.repository";
import { CreateStudentUseCase } from "./create-student.use-case";
import { DeleteStudentUseCase } from "./delete-student.use-case";
import { UpdateStudentUseCase } from "./update-student.use-case";

describe("Delete student use case", () => {
  it("should to be able to update a student name", async () => {
    const studentRepository = new MemoryStudentRepository();
    const createStudent = new CreateStudentUseCase(studentRepository);

    // cria um aluno
    const student = await createStudent.execute({
      name: "Fulano de Tal",
      academicRecord: "00008",
      documentNumber: "76157267003",
      email: "fulano@gmail.com",
    });

    // atualiza nome do aluno
    const sut = new UpdateStudentUseCase(studentRepository);

    const studentId = student.id;
    const updates = { name: "Ciclano de Tal" };
    await sut.execute(studentId, updates);

    const updatedStudent = await studentRepository.get(studentId);

    expect(updatedStudent).toBeDefined();
    expect(updatedStudent?.name).toBe(updates.name); // name de updatedStudent deve ser o mesmo enviado no updates
    expect(updatedStudent?.academicRecord).toBe(student.academicRecord); // academicRecord de updatedStudent deve continuar igual
    expect(updatedStudent?.documentNumber).toBe(student.documentNumber); // documentNumber de updatedStudent deve continuar igual
    expect(updatedStudent?.email).toBe(student.email); // email de updatedStudent deve continuar igual
  });

  it("should to be able to update a student email", async () => {
    const studentRepository = new MemoryStudentRepository();
    const createStudent = new CreateStudentUseCase(studentRepository);

    // cria um aluno
    const student = await createStudent.execute({
      name: "Fulano de Tal",
      academicRecord: "00008",
      documentNumber: "76157267003",
      email: "fulano@gmail.com",
    });

    // atualiza nome do aluno
    const sut = new UpdateStudentUseCase(studentRepository);

    const studentId = student.id;
    const updates = { email: "fulano@gmail.com" };
    await sut.execute(studentId, updates);

    const updatedStudent = await studentRepository.get(studentId);

    expect(updatedStudent).toBeDefined();
    expect(updatedStudent?.email).toBe(updates.email); // email de updatedStudent deve ser o mesmo enviado no updates
    expect(updatedStudent?.name).toBe(student.name); // name de updatedStudent deve continuar igual
    expect(updatedStudent?.academicRecord).toBe(student.academicRecord); // academicRecord de updatedStudent deve continuar igual
    expect(updatedStudent?.documentNumber).toBe(student.documentNumber); // documentNumber de updatedStudent deve continuar igual
  });

  it("should to be able to update a student name and email", async () => {
    const studentRepository = new MemoryStudentRepository();
    const createStudent = new CreateStudentUseCase(studentRepository);

    // cria um aluno
    const student = await createStudent.execute({
      name: "Fulano de Tal",
      academicRecord: "00008",
      documentNumber: "76157267003",
      email: "fulano@gmail.com",
    });

    // atualiza nome do aluno
    const sut = new UpdateStudentUseCase(studentRepository);

    const studentId = student.id;
    const updates = { name: "Ciclano de Tal", email: "fulano@gmail.com" };
    await sut.execute(studentId, updates);

    const updatedStudent = await studentRepository.get(studentId);

    expect(updatedStudent).toBeDefined();
    expect(updatedStudent?.email).toBe(updates.email); // email de updatedStudent deve ser o mesmo enviado no updates
    expect(updatedStudent?.name).toBe(updates.name); // name de updatedStudent deve ser o mesmo enviado no updates
    expect(updatedStudent?.academicRecord).toBe(student.academicRecord); // academicRecord de updatedStudent deve continuar igual
    expect(updatedStudent?.documentNumber).toBe(student.documentNumber); // documentNumber de updatedStudent deve continuar igual
  });

  it("should not update if a valid field was not sent", async () => {
    const studentRepository = new MemoryStudentRepository();
    const createStudent = new CreateStudentUseCase(studentRepository);

    // cria um aluno
    const student = await createStudent.execute({
      name: "Fulano de Tal",
      academicRecord: "00008",
      documentNumber: "76157267003",
      email: "fulano@gmail.com",
    });

    // atualiza nome do aluno
    const sut = new UpdateStudentUseCase(studentRepository);

    const studentId = student.id;
    const updates = {};
    const promise = sut.execute(studentId, updates);

    await expect(promise).rejects.toThrow("No valid fields were submitted");
  });

  it("should not update a student that does not exist", async () => {
    const studentRepository = new MemoryStudentRepository();

    const createStudent = new CreateStudentUseCase(studentRepository);

    const student = await createStudent.execute({
      name: "Fulano de Tal",
      academicRecord: "00008",
      documentNumber: "76157267003",
      email: "fulano@gmail.com",
    });

    const deleteStudent = new DeleteStudentUseCase(studentRepository);

    // deleta aluno
    const studentId = student.id;
    await deleteStudent.execute(studentId);

    // atualiza nome do aluno
    const sut = new UpdateStudentUseCase(studentRepository);

    const updates = { name: "Joãozinho" };
    const promise = sut.execute(studentId, updates);

    await expect(promise).rejects.toThrow("Student not found");
  });
});
