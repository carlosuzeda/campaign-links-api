import { verifyPassword } from "../../utils/hash";
import { signToken } from "../../lib/jwt";
import { AppError } from "../../utils/app-error";
import { UsersRepository } from "@/repositories/users-repository";

interface LoginRequest {
  email: string;
  password: string;
}

export class LoginUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ email, password }: LoginRequest) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Credenciais inválidas.", 401);
    }

    const passwordMatch = await verifyPassword(user.passwordHash, password);

    if (!passwordMatch) {
      throw new AppError("Credenciais inválidas.", 401);
    }

    const token = signToken(user.id);

    return { token };
  }
}
