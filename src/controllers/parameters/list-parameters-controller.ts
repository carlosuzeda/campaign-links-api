import { makeListParameters } from "@/factories/parameters/make-list-parameters";
import { Request, Response } from "express";

export async function listParametersController(req: Request, res: Response) {
  const useCase = makeListParameters();
  const { parameters } = await useCase.execute();

  return res.status(200).json(parameters);
}
