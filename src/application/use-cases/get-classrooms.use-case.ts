import IClassroomRepository from "../../core/repository/classroom.repository";
import IGetClassroomsUseCase from "../../core/use-case/get-classrooms.use-case";

export class GetClassroomsUseCase implements IGetClassroomsUseCase {
  constructor(private readonly classroomRepository: IClassroomRepository) {}

  async execute() {
    return this.classroomRepository.getAll();
  }
}
