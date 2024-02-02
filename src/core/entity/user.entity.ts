import generateUUID from "../../utils/functions/generateUUID";
import { UserProps } from "../../utils/interfaces";

export default class User {
  id: string;
  username: string;
  password: string;

  constructor({ username, password }: UserProps, id?: string) {
    this.id = id ?? generateUUID();
    this.username = username;
    this.password = password;
  }
}
