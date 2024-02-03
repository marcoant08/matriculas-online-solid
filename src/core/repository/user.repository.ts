import User from "../entity/user.entity";

export default interface IUserRepository {
  getByUsername: (id: string) => Promise<User | null>;
}
