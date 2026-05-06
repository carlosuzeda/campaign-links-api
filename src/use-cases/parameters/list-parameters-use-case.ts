import { ParametersRepository } from "@/repositories/parameters-repository";

export class ListParametersUseCase {
  constructor(private parametersRepository: ParametersRepository) {}

  async execute() {
    const parameters = await this.parametersRepository.findMany();

    return { parameters };
  }
}
