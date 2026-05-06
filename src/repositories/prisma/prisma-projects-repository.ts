import { Prisma } from "@/generated/prisma/client";

import { ProjectsRepository } from "../projects-repository";
import { prisma } from "@/lib/prisma";

export class PrismaProjectsRepository implements ProjectsRepository {
  async findById(id: string) {
    return prisma.project.findUnique({ where: { id } });
  }

  async findManyByUserId(userId: string) {
    return prisma.project.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }

  async create(data: Prisma.ProjectCreateInput) {
    return prisma.project.create({ data });
  }

  async delete(id: string) {
    await prisma.project.delete({ where: { id } });
  }
}
