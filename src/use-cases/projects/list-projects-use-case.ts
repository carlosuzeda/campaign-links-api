import { ProjectsRepository } from "@/repositories/projects-repository";

export class ListProjectsUseCase {
  constructor(private projectsRepository: ProjectsRepository) {}

  async execute(userId: string) {
    const projects = await this.projectsRepository.findManyByUserId(userId);

    return { projects };
  }
}
