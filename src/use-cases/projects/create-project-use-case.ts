import { ProjectsRepository } from "@/repositories/projects-repository";

interface CreateProjectRequest {
  name: string;
  userId: string;
}

export class CreateProjectUseCase {
  constructor(private projectsRepository: ProjectsRepository) {}

  async execute({ name, userId }: CreateProjectRequest) {
    const project = await this.projectsRepository.create({
      name,
      user: { connect: { id: userId } },
    });

    return { project };
  }
}
