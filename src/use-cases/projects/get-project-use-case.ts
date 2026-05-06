
import { ProjectsRepository } from "@/repositories/projects-repository";
import { AppError } from "../../utils/app-error";

interface GetProjectRequest {
  projectId: string;
  userId: string;
}

export class GetProjectUseCase {
  constructor(private projectsRepository: ProjectsRepository) {}

  async execute({ projectId, userId }: GetProjectRequest) {
    const project = await this.projectsRepository.findById(projectId);

    if (!project) {
      throw new AppError("Projeto não encontrado.", 404);
    }

    if (project.userId !== userId) {
      throw new AppError("Acesso negado.", 403);
    }

    return { project };
  }
}
