import { LinksRepository } from "@/repositories/links-repository";
import { AppError } from "../../utils/app-error";
import { ProjectsRepository } from "@/repositories/projects-repository";

interface CreateLinkRequest {
  name: string;
  baseUrl: string;
  projectId: string;
  userId: string;
}

export class CreateLinkUseCase {
  constructor(
    private linksRepository: LinksRepository,
    private projectsRepository: ProjectsRepository,
  ) {}

  async execute({ name, baseUrl, projectId, userId }: CreateLinkRequest) {
    const project = await this.projectsRepository.findById(projectId);

    if (!project) {
      throw new AppError("Projeto não encontrado.", 404);
    }

    if (project.userId !== userId) {
      throw new AppError("Acesso negado.", 403);
    }

    const link = await this.linksRepository.create({
      name,
      baseUrl,
      project: { connect: { id: projectId } },
    });

    return { link };
  }
}
