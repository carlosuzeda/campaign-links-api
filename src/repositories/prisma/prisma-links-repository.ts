
import { Prisma } from "@/generated/prisma/client";

import { LinksRepository } from "../links-repository";
import { prisma } from "@/lib/prisma";


const linkInclude = {
  linkParameters: {
    include: {
      parameter: {
        select: { key: true, value: true },
      },
    },
  },
  redirect: {
    select: { destinationUrl: true },
  },
};

export class PrismaLinksRepository implements LinksRepository {
  async findById(id: string) {
    return prisma.link.findUnique({ where: { id }, include: linkInclude });
  }

  async findManyByProjectId(projectId: string){
    return prisma.link.findMany({
      where: { projectId },
      include: linkInclude,
      orderBy: { createdAt: "desc" },
    });
  }

  async create(data: Prisma.LinkCreateInput){
    return prisma.link.create({ data });
  }

  async update(id: string, data: Prisma.LinkUpdateInput) {
    return prisma.link.update({ where: { id }, data });
  }

  async delete(id: string) {
    await prisma.link.delete({ where: { id } });
  }
}
