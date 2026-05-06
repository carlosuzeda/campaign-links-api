import { ListParametersUseCase } from "@/use-cases/parameters/list-parameters-use-case";
import { PrismaParametersRepository } from "../../repositories/prisma/prisma-parameters-repository";

export function makeListParameters() {
  const parametersRepository = new PrismaParametersRepository();
  return new ListParametersUseCase(parametersRepository);
}
