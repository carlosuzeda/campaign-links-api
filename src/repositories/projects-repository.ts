import { Prisma, Project } from "@/generated/prisma/client";

export interface ProjectsRepository {
  findById(id: string): Promise<Project | null>;
  findManyByUserId(userId: string): Promise<Project[]>;
  create(data: Prisma.ProjectCreateInput): Promise<Project>;
  delete(id: string): Promise<void>;
}
