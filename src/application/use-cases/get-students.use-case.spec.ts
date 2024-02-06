import { MemoryStudentRepository } from "../../infra/repository/memory.student.repository";
import { GetStudentsUseCase } from "./get-students.use-case";

describe("Get classrooms use case", () => {
  it("should to be able to get classrooms", async () => {
    const studentRepository = new MemoryStudentRepository();

    const sut = new GetStudentsUseCase(studentRepository);

    const response = await sut.execute();

    expect(response).toBeTruthy();
  });
});
