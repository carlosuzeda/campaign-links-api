import { LinksRepository } from "@/repositories/links-repository";
import { AppError } from "../../utils/app-error";
import { ProjectsRepository } from "@/repositories/projects-repository";

interface DeleteLinkRequest {
  linkId: string;
  userId: string;
}

export class DeleteLinkUseCase {
  constructor(
    private linksRepository: LinksRepository,
    private projectsRepository: ProjectsRepository,
  ) {}

  async execute({ linkId, userId }: DeleteLinkRequest) {
    const link = await this.linksRepository.findById(linkId);

    if (!link) {
      throw new AppError("Link não encontrado.", 404);
    }

    const project = await this.projectsRepository.findById(link.projectId);

    if (project!.userId !== userId) {
      throw new AppError("Acesso negado.", 403);
    }

    await this.linksRepository.delete(linkId);
  }
}
