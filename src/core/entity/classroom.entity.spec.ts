import generateUUID from "../../utils/functions/generateUUID";
import Classroom from "./classroom.entity";

describe("Classroom entity", () => {
  it("should be able to create a classroom entity with the correct properties", async () => {
    const _id = generateUUID();
    const props = {
      name: "Theory of Games and Economic Behavior",
      teacher: "John von Neumann",
    };

    const classroom = new Classroom(props, _id);

    expect(classroom.id).toBe(_id);
    expect(classroom.name).toBe(props.name);
    expect(classroom.teacher).toBe(props.teacher);
  });

  it("should be able to create a classroom with a random id", async () => {
    const props = {
      name: "Clean Architecture: A Craftsman's Guide to Software Structure and Design",
      teacher: "Robert Cecil Martin (Uncle Bob)",
    };

    const classroom = new Classroom(props);

    expect(classroom.id).toBeTruthy();
  });
});
