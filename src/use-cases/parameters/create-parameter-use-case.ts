import { ParametersRepository } from "@/repositories/parameters-repository";

interface CreateParameterRequest {
  key: string;
  value: string;
}

export class CreateParameterUseCase {
  constructor(private parametersRepository: ParametersRepository) {}

  async execute({ key, value }: CreateParameterRequest) {
    const parameter = await this.parametersRepository.create({ key, value });

    return { parameter };
  }
}
