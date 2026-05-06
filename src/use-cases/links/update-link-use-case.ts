import { LinksRepository } from "@/repositories/links-repository";
import { AppError } from "../../utils/app-error";
import { ProjectsRepository } from "@/repositories/projects-repository";

interface UpdateLinkRequest {
  linkId: string;
  userId: string;
  name?: string;
  baseUrl?: string;
}

export class UpdateLinkUseCase {
  constructor(
    private linksRepository: LinksRepository,
    private projectsRepository: ProjectsRepository,
  ) {}

  async execute({ linkId, userId, name, baseUrl }: UpdateLinkRequest) {
    const link = await this.linksRepository.findById(linkId);

    if (!link) {
      throw new AppError("Link não encontrado.", 404);
    }

    const project = await this.projectsRepository.findById(link.projectId);

    if (project!.userId !== userId) {
      throw new AppError("Acesso negado.", 403);
    }

    const updated = await this.linksRepository.update(linkId, {
      name,
      baseUrl,
    });

    return { link: updated };
  }
}
