import generateUUID from "../../utils/functions/generateUUID";
import Student from "./student.entity";

describe("Student entity", () => {
  it("should be able to create a student entity with the correct properties", async () => {
    const _id = generateUUID();
    const props = {
      academicRecord: "00002",
      documentNumber: "04583959001",
      email: "torvalds@email.com",
      name: "Linus Torvalds",
    };

    const student = new Student(props, _id);

    expect(student.id).toBe(_id);
    expect(student.academicRecord).toBe(props.academicRecord);
    expect(student.documentNumber).toBe(props.documentNumber);
    expect(student.email).toBe(props.email);
    expect(student.name).toBe(props.name);
  });

  it("should be able to create a student with a random id", async () => {
    const student = new Student({
      academicRecord: "00003",
      documentNumber: "74338067098",
      email: "ry@email.com",
      name: "Ryan Dahl",
    });

    expect(student.id).toBeTruthy();
  });
});
