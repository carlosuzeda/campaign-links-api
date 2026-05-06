import { ProjectsRepository } from "@/repositories/projects-repository";
import { AppError } from "../../utils/app-error";

interface DeleteProjectRequest {
  projectId: string;
  userId: string;
}

export class DeleteProjectUseCase {
  constructor(private projectsRepository: ProjectsRepository) {}

  async execute({ projectId, userId }: DeleteProjectRequest) {
    const project = await this.projectsRepository.findById(projectId);

    if (!project) {
      throw new AppError("Projeto não encontrado.", 404);
    }

    if (project.userId !== userId) {
      throw new AppError("Acesso negado.", 403);
    }

    await this.projectsRepository.delete(projectId);
  }
}
