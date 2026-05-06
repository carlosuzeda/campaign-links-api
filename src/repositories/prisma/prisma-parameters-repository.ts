import { prisma } from "@/lib/prisma";
import { ParametersRepository } from "../parameters-repository";
import { Prisma } from "@/generated/prisma/client";

export class PrismaParametersRepository implements ParametersRepository {
  async findById(id: string) {
    return prisma.parameter.findUnique({ where: { id } });
  }

  async findMany() {
    return prisma.parameter.findMany({ orderBy: { createdAt: "desc" } });
  }

  async create(data: Prisma.ParameterCreateInput) {
    return prisma.parameter.create({ data });
  }

  async attach(linkId: string, parameterId: string) {
    return prisma.linkParameter.create({ data: { linkId, parameterId } });
  }

  async detach(linkId: string, parameterId: string): Promise<void> {
    await prisma.linkParameter.delete({
      where: { linkId_parameterId: { linkId, parameterId } },
    });
  }
}
