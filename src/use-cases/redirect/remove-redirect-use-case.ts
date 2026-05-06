import { LinksRepository } from "@/repositories/links-repository";
import { AppError } from "../../utils/app-error";
import { ProjectsRepository } from "@/repositories/projects-repository";
import { RedirectsRepository } from "@/repositories/redirects-repository";

interface RemoveRedirectRequest {
  linkId: string;
  userId: string;
}

export class RemoveRedirectUseCase {
  constructor(
    private linksRepository: LinksRepository,
    private projectsRepository: ProjectsRepository,
    private redirectsRepository: RedirectsRepository,
  ) {}

  async execute({ linkId, userId }: RemoveRedirectRequest) {
    const link = await this.linksRepository.findById(linkId);

    if (!link) {
      throw new AppError("Link não encontrado.", 404);
    }

    const project = await this.projectsRepository.findById(link.projectId);

    if (project!.userId !== userId) {
      throw new AppError("Acesso negado.", 403);
    }

    const existing = await this.redirectsRepository.findByLinkId(linkId);

    if (!existing) {
      throw new AppError("Este link não possui redirect.", 404);
    }

    await this.redirectsRepository.delete(linkId);
  }
}
