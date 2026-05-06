import { LoginUseCase } from "@/use-cases/auth/login-use-case";
import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository";

export function makeLogin() {
  const usersRepository = new PrismaUsersRepository();
  return new LoginUseCase(usersRepository);
}
