import { ListProjectsUseCase } from "@/use-cases/projects/list-projects-use-case";
import { PrismaProjectsRepository } from "../../repositories/prisma/prisma-projects-repository";

export function makeListProjects() {
  const projectsRepository = new PrismaProjectsRepository();
  return new ListProjectsUseCase(projectsRepository);
}
