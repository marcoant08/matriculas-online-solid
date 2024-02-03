import { MemoryClassroomRepository } from "../../infra/repository/memory.classroom.repository";
import { MemoryEnrollmentRepository } from "../../infra/repository/memory.enrollment.repository";
import { GetEnrollmentsFromClassroomUseCase } from "./get-enrollments-from-classroom.use-case";

describe("Get enrollments from classroom use case", () => {
  it("should to be able to get enrollments from classroom", async () => {
    const classroomRepository = new MemoryClassroomRepository();
    const enrollmentRepository = new MemoryEnrollmentRepository();

    const sut = new GetEnrollmentsFromClassroomUseCase(
      classroomRepository,
      enrollmentRepository
    );

    const response = await sut.execute("e7c41805-68b2-4e38-ace1-aa17178f4dc1");

    expect(response).toBeTruthy();
  });

  it("should not get enrollments of a student who does not exist", async () => {
    const classroomRepository = new MemoryClassroomRepository();
    const enrollmentRepository = new MemoryEnrollmentRepository();

    const sut = new GetEnrollmentsFromClassroomUseCase(
      classroomRepository,
      enrollmentRepository
    );

    const promise = sut.execute("null");

    await expect(promise).rejects.toThrow("Classroom not found");
  });
});
