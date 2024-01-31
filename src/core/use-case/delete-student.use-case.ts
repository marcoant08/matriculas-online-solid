export default interface IDeleteStudentUseCase {
  execute: (studentId: string) => Promise<void>;
}
