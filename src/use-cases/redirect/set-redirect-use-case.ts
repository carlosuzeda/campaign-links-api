import { LinksRepository } from "@/repositories/links-repository";
import { AppError } from "../../utils/app-error";
import { ProjectsRepository } from "@/repositories/projects-repository";
import { RedirectsRepository } from "@/repositories/redirects-repository";

interface SetRedirectRequest {
  linkId: string;
  destinationUrl: string;
  userId: string;
}

export class SetRedirectUseCase {
  constructor(
    private linksRepository: LinksRepository,
    private projectsRepository: ProjectsRepository,
    private redirectsRepository: RedirectsRepository,
  ) {}

  async execute({ linkId, destinationUrl, userId }: SetRedirectRequest) {
    const link = await this.linksRepository.findById(linkId);

    if (!link) {
      throw new AppError("Link não encontrado.", 404);
    }

    const project = await this.projectsRepository.findById(link.projectId);

    if (project!.userId !== userId) {
      throw new AppError("Acesso negado.", 403);
    }

    const existing = await this.redirectsRepository.findByLinkId(linkId);

    if (existing) {
      const redirect = await this.redirectsRepository.update(
        linkId,
        destinationUrl,
      );
      return { redirect };
    }

    const redirect = await this.redirectsRepository.create({
      destinationUrl,
      link: { connect: { id: linkId } },
    });

    return { redirect };
  }
}
