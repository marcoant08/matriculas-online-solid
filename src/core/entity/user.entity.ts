import generateUUID from "../../utils/functions/generateUUID";

export default class User {
  id: string;
  password: string;

  constructor(password: string, id?: string) {
    this.id = id ?? generateUUID();
    this.password = password;
  }
}
