
import { Prisma } from "@/generated/prisma/client";

import { UsersRepository } from "../users-repository";
import { prisma } from "@/lib/prisma";


export class PrismaUsersRepository implements UsersRepository {
  async findById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  async create(data: Prisma.UserCreateInput) {
    return prisma.user.create({ data });
  }
}
