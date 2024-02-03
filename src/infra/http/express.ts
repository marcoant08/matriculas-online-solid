import express from "express";
import { PGPrismaStudentRepository } from "../repository/prisma.student.repository";
import { CreateStudentUseCase } from "../../application/use-cases/create-student.use-case";
import { CreateStudentController } from "../../controller/create-student.controller";
import { UpdateStudentController } from "../../controller/update-student.controller";
import { UpdateStudentUseCase } from "../../application/use-cases/update-student.use-case";
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

app.listen(HTTP_PORT, () => {
  console.log(`[HTTP Server running in port ${HTTP_PORT}]`);
});
