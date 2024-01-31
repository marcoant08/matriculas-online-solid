export default class ValidationException extends Error {
  name: string;
  message: string;
  statusCode: number;

  constructor(message: string) {
    super();
    this.name = "ValidationException";
    this.message = message;
    this.statusCode = 400;
  }
}
