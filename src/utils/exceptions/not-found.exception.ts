export default class NotFoundException extends Error {
  name: string;
  message: string;
  statusCode: number;

  constructor(message: string) {
    super();
    this.name = "NotFoundException";
    this.message = message;
    this.statusCode = 404;
  }
}
