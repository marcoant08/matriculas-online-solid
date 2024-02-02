export default interface IDeleteEnrollmentUseCase {
  execute: (enrollmentId: string) => Promise<void>;
}
