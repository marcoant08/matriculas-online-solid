import generateUUID from "../../utils/functions/generateUUID";
import User from "./user.entity";

describe("User entity", () => {
  it("should be able to create a user entity with the correct properties", async () => {
    const _id = generateUUID();
    const password = Math.random().toString(36).slice(3);

    const student = new User(password, _id);

    expect(student.id).toBe(_id);
    expect(student.password).toBe(password);
  });

  it("should be able to create a user with a random id", async () => {
    const password = Math.random().toString(36).slice(3);
    const student = new User(password);

    expect(student.id).toBeTruthy();
  });
});
