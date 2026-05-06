import { LinksRepository } from "@/repositories/links-repository";
import { AppError } from "../../utils/app-error";
import { ParametersRepository } from "@/repositories/parameters-repository";
import { ProjectsRepository } from "@/repositories/projects-repository";

interface AttachParameterRequest {
  linkId: string;
  parameterId: string;
  userId: string;
}

export class AttachParameterUseCase {
  constructor(
    private linksRepository: LinksRepository,
    private parametersRepository: ParametersRepository,
    private projectsRepository: ProjectsRepository,
  ) {}

  async execute({ linkId, parameterId, userId }: AttachParameterRequest) {
    const link = await this.linksRepository.findById(linkId);

    if (!link) {
      throw new AppError("Link não encontrado.", 404);
    }

    const project = await this.projectsRepository.findById(link.projectId);

    if (project!.userId !== userId) {
      throw new AppError("Acesso negado.", 403);
    }

    const parameter = await this.parametersRepository.findById(parameterId);

    if (!parameter) {
      throw new AppError("Parâmetro não encontrado.", 404);
    }

    const linked = await this.parametersRepository.attach(linkId, parameterId);

    return { linked };
  }
}
