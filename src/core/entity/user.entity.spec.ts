import generateUUID from "../../utils/functions/generateUUID";
import User from "./user.entity";

describe("User entity", () => {
  it("should be able to create a user entity with the correct properties", async () => {
    const _id = generateUUID();
    const username = "ryan.dahl";
    const password = Math.random().toString(36).slice(3);

    const student = new User({ username, password }, _id);

    expect(student.id).toBe(_id);
    expect(student.username).toBe(username);
    expect(student.password).toBe(password);
  });

  it("should be able to create a user with a random id", async () => {
    const username = "ryan.dahl";
    const password = Math.random().toString(36).slice(3);

    const student = new User({ username, password });

    expect(student.id).toBeTruthy();
  });
});
