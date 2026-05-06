import { CreateProjectUseCase } from "@/use-cases/projects/create-project-use-case";
import { PrismaProjectsRepository } from "../../repositories/prisma/prisma-projects-repository";

export function makeCreateProject() {
  const projectsRepository = new PrismaProjectsRepository();
  return new CreateProjectUseCase(projectsRepository);
}
