import { GetProjectUseCase } from "@/use-cases/projects/get-project-use-case";
import { PrismaProjectsRepository } from "../../repositories/prisma/prisma-projects-repository";

export function makeGetProject() {
  const projectsRepository = new PrismaProjectsRepository();
  return new GetProjectUseCase(projectsRepository);
}
