import { buildUrl } from "../../utils/build-url";
import { AppError } from "../../utils/app-error";
import { LinksRepository } from "@/repositories/links-repository";
import { ProjectsRepository } from "@/repositories/projects-repository";

interface GenerateLinkRequest {
  linkId: string;
  userId: string;
}

export class GenerateLinkUseCase {
  constructor(
    private linksRepository: LinksRepository,
    private projectsRepository: ProjectsRepository,
  ) {}

  async execute({ linkId, userId }: GenerateLinkRequest) {
    const link = await this.linksRepository.findById(linkId);

    if (!link) {
      throw new AppError("Link não encontrado.", 404);
    }

    const project = await this.projectsRepository.findById(link.projectId);

    if (project!.userId !== userId) {
      throw new AppError("Acesso negado.", 403);
    }

    const parameters = link.linkParameters.map((lp) => ({
      key: lp.parameter.key,
      value: lp.parameter.value,
    }));

    const url = buildUrl({
      baseUrl: link.baseUrl,
      parameters,
      redirectUrl: link.redirect?.destinationUrl,
    });

    return { url };
  }
}
