import { LinkParameter, Parameter, Prisma } from "@/generated/prisma/client";

export interface ParametersRepository {
  findById(id: string): Promise<Parameter | null>;
  findMany(): Promise<Parameter[]>;
  create(data: Prisma.ParameterCreateInput): Promise<Parameter>;
  attach(linkId: string, parameterId: string): Promise<LinkParameter>;
  detach(linkId: string, parameterId: string): Promise<void>;
}
