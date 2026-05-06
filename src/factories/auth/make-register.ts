import { RegisterUseCase } from "@/use-cases/auth/register-use-case";
import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository";

export function makeRegister() {
  const usersRepository = new PrismaUsersRepository();
  return new RegisterUseCase(usersRepository);
}
