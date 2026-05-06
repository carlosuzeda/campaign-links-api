import { DeleteProjectUseCase } from "@/use-cases/projects/delete-project-use-case";
import { PrismaProjectsRepository } from "../../repositories/prisma/prisma-projects-repository";

export function makeDeleteProject() {
  const projectsRepository = new PrismaProjectsRepository();
  return new DeleteProjectUseCase(projectsRepository);
}
