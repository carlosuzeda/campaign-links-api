import { CreateParameterUseCase } from "@/use-cases/parameters/create-parameter-use-case";
import { PrismaParametersRepository } from "../../repositories/prisma/prisma-parameters-repository";

export function makeCreateParameter() {
  const parametersRepository = new PrismaParametersRepository();
  return new CreateParameterUseCase(parametersRepository);
}
