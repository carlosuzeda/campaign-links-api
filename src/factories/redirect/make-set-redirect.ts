import { SetRedirectUseCase } from "@/use-cases/redirect/set-redirect-use-case";
import { PrismaLinksRepository } from "../../repositories/prisma/prisma-links-repository";
import { PrismaProjectsRepository } from "../../repositories/prisma/prisma-projects-repository";
import { PrismaRedirectsRepository } from "../../repositories/prisma/prisma-redirects-repository";

export function makeSetRedirect() {
  const linksRepository = new PrismaLinksRepository();
  const projectsRepository = new PrismaProjectsRepository();
  const redirectsRepository = new PrismaRedirectsRepository();
  return new SetRedirectUseCase(
    linksRepository,
    projectsRepository,
    redirectsRepository,
  );
}
