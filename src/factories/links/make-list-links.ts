import { ListLinksUseCase } from "@/use-cases/links/list-links-use-case";
import { PrismaLinksRepository } from "../../repositories/prisma/prisma-links-repository";
import { PrismaProjectsRepository } from "../../repositories/prisma/prisma-projects-repository";

export function makeListLinks() {
  const linksRepository = new PrismaLinksRepository();
  const projectsRepository = new PrismaProjectsRepository();
  return new ListLinksUseCase(linksRepository, projectsRepository);
}
