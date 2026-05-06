import { LinksRepository } from "@/repositories/links-repository";
import { AppError } from "../../utils/app-error";
import { ParametersRepository } from "@/repositories/parameters-repository";
import { ProjectsRepository } from "@/repositories/projects-repository";

interface DetachParameterRequest {
  linkId: string;
  parameterId: string;
  userId: string;
}

export class DetachParameterUseCase {
  constructor(
    private linksRepository: LinksRepository,
    private parametersRepository: ParametersRepository,
    private projectsRepository: ProjectsRepository,
  ) {}

  async execute({ linkId, parameterId, userId }: DetachParameterRequest) {
    const link = await this.linksRepository.findById(linkId);

    if (!link) {
      throw new AppError("Link não encontrado.", 404);
    }

    const project = await this.projectsRepository.findById(link.projectId);

    if (project!.userId !== userId) {
      throw new AppError("Acesso negado.", 403);
    }

    await this.parametersRepository.detach(linkId, parameterId);
  }
}
