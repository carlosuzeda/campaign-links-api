import { LinksRepository } from "@/repositories/links-repository";
import { AppError } from "../../utils/app-error";
import { ProjectsRepository } from "@/repositories/projects-repository";

interface ListLinksRequest {
  projectId: string;
  userId: string;
}

export class ListLinksUseCase {
  constructor(
    private linksRepository: LinksRepository,
    private projectsRepository: ProjectsRepository,
  ) {}

  async execute({ projectId, userId }: ListLinksRequest) {
    const project = await this.projectsRepository.findById(projectId);

    if (!project) {
      throw new AppError("Projeto não encontrado.", 404);
    }

    if (project.userId !== userId) {
      throw new AppError("Acesso negado.", 403);
    }

    const links = await this.linksRepository.findManyByProjectId(projectId);

    return { links };
  }
}
