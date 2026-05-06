import { DetachParameterUseCase } from "@/use-cases/parameters/detach-parameter-use-case";
import { PrismaLinksRepository } from "../../repositories/prisma/prisma-links-repository";
import { PrismaParametersRepository } from "../../repositories/prisma/prisma-parameters-repository";
import { PrismaProjectsRepository } from "../../repositories/prisma/prisma-projects-repository";

export function makeDetachParameter() {
  const linksRepository = new PrismaLinksRepository();
  const parametersRepository = new PrismaParametersRepository();
  const projectsRepository = new PrismaProjectsRepository();
  return new DetachParameterUseCase(
    linksRepository,
    parametersRepository,
    projectsRepository,
  );
}
