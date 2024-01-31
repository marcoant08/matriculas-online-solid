export default class AlreadyExistsException extends Error {
  name: string;
  message: string;
  statusCode: number;

  constructor(message: string) {
    super();
    this.name = "AlreadyExistsException";
    this.message = message;
    this.statusCode = 400;
  }
}
