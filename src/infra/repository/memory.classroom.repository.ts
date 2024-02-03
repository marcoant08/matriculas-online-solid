import Classroom from "../../core/entity/classroom.entity";
import IClassroomRepository from "../../core/repository/classroom.repository";

const data = [
  {
    id: "5cff8f91-a769-4e1d-bbc2-c09cf5945b65",
    name: "Theory of Games and Economic Behavior",
    teacher: "John von Neumann",
  },
  {
    id: "3eb8be7b-7378-4273-a25b-4f5da696c1a6",
    name: "Clean Architecture: A Craftsman's Guide to Software Structure and Design",
    teacher: "Robert Cecil Martin (Uncle Bob)",
  },
  {
    id: "e7c41805-68b2-4e38-ace1-aa17178f4dc1",
    name: "Mathematical logic",
    teacher: "Alan Turing",
  },
];

// implementação de repositório em memória para testes
export class MemoryClassroomRepository implements IClassroomRepository {
  private classrooms: Classroom[];

  constructor() {
    this.classrooms = data.map((item) => {
      return new Classroom({ name: item.name, teacher: item.teacher }, item.id);
    });
  }

  async get(id: string) {
    const classroom = this.classrooms.find((c) => c.id === id);
    return classroom ?? null;
  }

  async getAll() {
    return this.classrooms;
  }
}
