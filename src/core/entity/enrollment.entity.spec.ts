import Enrollment from "./enrollment.entity";
import generateUUID from "../../utils/functions/generateUUID";

describe("Enrollment entity", () => {
  it("should be able to create a enrollment entity with the correct properties", async () => {
    const _id = generateUUID();
    const props = { studentId: generateUUID(), classroomId: generateUUID() };

    const enrollment = new Enrollment(props, _id);

    expect(enrollment.id).toBe(_id);
    expect(enrollment.studentId).toBe(props.studentId);
    expect(enrollment.classroomId).toBe(props.classroomId);
  });

  it("should be able to create a enrollment with a random id", async () => {
    const studentId = generateUUID(); // gera um id de aluno aleatório
    const classroomId = generateUUID(); // gera um id de turma online aleatório

    const enrollment = new Enrollment({ studentId, classroomId });

    expect(enrollment.id).toBeTruthy();
  });
});
