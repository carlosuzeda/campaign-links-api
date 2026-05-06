import { DeleteLinkUseCase } from "@/use-cases/links/delete-link-use-case";
import { PrismaLinksRepository } from "../../repositories/prisma/prisma-links-repository";
import { PrismaProjectsRepository } from "../../repositories/prisma/prisma-projects-repository";

export function makeDeleteLink() {
  const linksRepository = new PrismaLinksRepository();
  const projectsRepository = new PrismaProjectsRepository();
  return new DeleteLinkUseCase(linksRepository, projectsRepository);
}
