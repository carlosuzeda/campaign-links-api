import { GenerateLinkUseCase } from "@/use-cases/links/generate-link-use-case";
import { PrismaLinksRepository } from "../../repositories/prisma/prisma-links-repository";
import { PrismaProjectsRepository } from "../../repositories/prisma/prisma-projects-repository";

export function makeGenerateLink() {
  const linksRepository = new PrismaLinksRepository();
  const projectsRepository = new PrismaProjectsRepository();
  return new GenerateLinkUseCase(linksRepository, projectsRepository);
}
