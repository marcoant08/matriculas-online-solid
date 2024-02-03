import express from "express";
import { PGPrismaStudentRepository } from "../repository/pgprisma.student.repository";
import { CreateStudentUseCase } from "../../application/use-cases/create-student.use-case";
import { CreateStudentController } from "../../controller/create-student.controller";
import { UpdateStudentController } from "../../controller/update-student.controller";
import { UpdateStudentUseCase } from "../../application/use-cases/update-student.use-case";
import { DeleteStudentController } from "../../controller/delete-student.controller";
import { DeleteStudentUseCase } from "../../application/use-cases/delete-student.use-case";
import { CreateEnrollmentUseCase } from "../../application/use-cases/create-enrollment.use-case";
import { PGPrismaEnrollmentRepository } from "../repository/pgprisma.enrollment.repository";
import { CreateEnrollmentController } from "../../controller/create-enrollment.controller";
import { PGPrismaClassroomRepository } from "../repository/pgprisma.classroom.repository";
import { DeleteEnrollmentUseCase } from "../../application/use-cases/delete-enrollment.use-case";
import { DeleteEnrollmentController } from "../../controller/delete-enrollment.controller";
import { GetEnrollmentsFromClassroomController } from "../../controller/get-enrollments-from-classroom.controller";
import { GetEnrollmentsFromClassroomUseCase } from "../../application/use-cases/get-enrollments-from-classroom.use-case";
import { GetClassroomsUseCase } from "../../application/use-cases/get-classrooms.use-case";
import { GetClassroomsController } from "../../controller/get-classrooms.controller";
const HTTP_PORT = 3333;

const app = express();
app.use(express.json());

app.post("/student", async (req, res) => {
  const pgPrismaStudentRepository = new PGPrismaStudentRepository();
  const useCase = new CreateStudentUseCase(pgPrismaStudentRepository);
  const controller = new CreateStudentController(useCase);

  const controllerResponse = await controller.execute({
    body: req.body,
  });

  return res
    .status(controllerResponse.statusCode)
    .json(controllerResponse.data);
});

app.patch("/student/:studentId", async (req, res) => {
  const pgPrismaStudentRepository = new PGPrismaStudentRepository();
  const useCase = new UpdateStudentUseCase(pgPrismaStudentRepository);
  const controller = new UpdateStudentController(useCase);

  const controllerResponse = await controller.execute({
    body: req.body,
    params: { path: req.params },
  });

  return res
    .status(controllerResponse.statusCode)
    .json(controllerResponse.data);
});

app.delete("/student/:studentId", async (req, res) => {
  const pgPrismaStudentRepository = new PGPrismaStudentRepository();
  const useCase = new DeleteStudentUseCase(pgPrismaStudentRepository);
  const controller = new DeleteStudentController(useCase);

  const controllerResponse = await controller.execute({
    params: { path: req.params },
  });

  return res
    .status(controllerResponse.statusCode)
    .json(controllerResponse.data);
});

app.post("/enrollment", async (req, res) => {
  const pgPrismaStudentRepository = new PGPrismaStudentRepository();
  const pgPrismaEnrollmentRepository = new PGPrismaEnrollmentRepository();
  const pgPrismaClassroomRepository = new PGPrismaClassroomRepository();
  const useCase = new CreateEnrollmentUseCase(
    pgPrismaStudentRepository,
    pgPrismaClassroomRepository,
    pgPrismaEnrollmentRepository
  );
  const controller = new CreateEnrollmentController(useCase);

  const controllerResponse = await controller.execute({
    body: req.body,
  });

  return res
    .status(controllerResponse.statusCode)
    .json(controllerResponse.data);
});

app.delete("/enrollment/:enrollmentId", async (req, res) => {
  const pgPrismaEnrollmentRepository = new PGPrismaEnrollmentRepository();
  const useCase = new DeleteEnrollmentUseCase(pgPrismaEnrollmentRepository);
  const controller = new DeleteEnrollmentController(useCase);

  const controllerResponse = await controller.execute({
    params: { path: req.params },
  });

  return res
    .status(controllerResponse.statusCode)
    .json(controllerResponse.data);
});

app.get("/classroom/:classroomId/enrollments", async (req, res) => {
  const pgPrismaClassroomRepository = new PGPrismaClassroomRepository();
  const pgPrismaEnrollmentRepository = new PGPrismaEnrollmentRepository();
  const useCase = new GetEnrollmentsFromClassroomUseCase(
    pgPrismaClassroomRepository,
    pgPrismaEnrollmentRepository
  );
  const controller = new GetEnrollmentsFromClassroomController(useCase);

  const controllerResponse = await controller.execute({
    params: { path: req.params },
  });

  return res
    .status(controllerResponse.statusCode)
    .json(controllerResponse.data);
});

app.get("/classroom", async (_, res) => {
  const pgPrismaClassroomRepository = new PGPrismaClassroomRepository();
  const useCase = new GetClassroomsUseCase(pgPrismaClassroomRepository);
  const controller = new GetClassroomsController(useCase);

  const controllerResponse = await controller.execute();

  return res
    .status(controllerResponse.statusCode)
    .json(controllerResponse.data);
});

app.listen(HTTP_PORT, () => {
  console.log(`[HTTP Server running in port ${HTTP_PORT}]`);
});
