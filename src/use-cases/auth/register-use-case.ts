import { hashPassword } from "../../utils/hash";
import { AppError } from "../../utils/app-error";
import { UsersRepository } from "@/repositories/users-repository";

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterRequest) {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("E-mail já cadastrado.", 409);
    }

    const passwordHash = await hashPassword(password);

    const user = await this.usersRepository.create({
      name,
      email,
      passwordHash,
    });

    return { user };
  }
}
