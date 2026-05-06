import { UpdateLinkUseCase } from "@/use-cases/links/update-link-use-case";
import { PrismaLinksRepository } from "../../repositories/prisma/prisma-links-repository";
import { PrismaProjectsRepository } from "../../repositories/prisma/prisma-projects-repository";

export function makeUpdateLink() {
  const linksRepository = new PrismaLinksRepository();
  const projectsRepository = new PrismaProjectsRepository();
  return new UpdateLinkUseCase(linksRepository, projectsRepository);
}
