import { CreateLinkUseCase } from "@/use-cases/links/create-link-use-case";
import { PrismaLinksRepository } from "../../repositories/prisma/prisma-links-repository";
import { PrismaProjectsRepository } from "../../repositories/prisma/prisma-projects-repository";

export function makeCreateLink() {
  const linksRepository = new PrismaLinksRepository();
  const projectsRepository = new PrismaProjectsRepository();
  return new CreateLinkUseCase(linksRepository, projectsRepository);
}
