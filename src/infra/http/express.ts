import express from "express";
import { PGPrismaStudentRepository } from "../repository/prisma.student.repository";
import { CreateStudentUseCase } from "../../application/use-cases/create-student.use-case";
import { CreateStudentController } from "../../controller/create-student.controller";
const HTTP_PORT = 3333;

const app = express();
app.use(express.json());

app.post("/student", async (req, res) => {
  const pgPrismaStudentRepository = new PGPrismaStudentRepository();
  const createStudentUseCase = new CreateStudentUseCase(
    pgPrismaStudentRepository
  );
  const controller = new CreateStudentController(createStudentUseCase);

  const controllerResponse = await controller.execute({ body: req.body });

  return res
    .status(controllerResponse.statusCode)
    .json(controllerResponse.data);
});

app.listen(HTTP_PORT, () => {
  console.log(`[HTTP Server running in port ${HTTP_PORT}]`);
});
