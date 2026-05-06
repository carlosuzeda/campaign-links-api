import { PrismaLinksRepository } from "../../repositories/prisma/prisma-links-repository";
import { PrismaProjectsRepository } from "../../repositories/prisma/prisma-projects-repository";
import { PrismaRedirectsRepository } from "../../repositories/prisma/prisma-redirects-repository";
import { RemoveRedirectUseCase } from "../../use-cases/redirect/remove-redirect-use-case";

export function makeRemoveRedirect() {
  const linksRepository = new PrismaLinksRepository();
  const projectsRepository = new PrismaProjectsRepository();
  const redirectsRepository = new PrismaRedirectsRepository();
  return new RemoveRedirectUseCase(
    linksRepository,
    projectsRepository,
    redirectsRepository,
  );
}
