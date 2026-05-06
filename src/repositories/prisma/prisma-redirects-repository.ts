import { prisma } from "@/lib/prisma";
import { RedirectsRepository } from "../redirects-repository";
import { Prisma } from "@/generated/prisma/client";

export class PrismaRedirectsRepository implements RedirectsRepository {
  async findByLinkId(linkId: string) {
    return prisma.redirect.findUnique({ where: { linkId } });
  }

  async create(data: Prisma.RedirectCreateInput) {
    return prisma.redirect.create({ data });
  }

  async update(linkId: string, destinationUrl: string) {
    return prisma.redirect.update({
      where: { linkId },
      data: { destinationUrl },
    });
  }

  async delete(linkId: string) {
    await prisma.redirect.delete({ where: { linkId } });
  }
}
