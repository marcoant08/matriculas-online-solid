import { MemoryClassroomRepository } from "../../infra/repository/memory.classroom.repository";
import { GetClassroomsUseCase } from "./get-classrooms.use-case";

describe("Get classrooms use case", () => {
  it("should to be able to get classrooms", async () => {
    const classroomRepository = new MemoryClassroomRepository();

    const sut = new GetClassroomsUseCase(classroomRepository);

    const response = await sut.execute();

    expect(response).toBeTruthy();
  });
});
