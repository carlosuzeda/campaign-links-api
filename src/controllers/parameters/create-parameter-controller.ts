import { makeCreateParameter } from "@/factories/parameters/make-create-parameter";
import { Request, Response } from "express";


export async function createParameterController(req: Request, res: Response) {
  const { key, value } = req.body;

  const useCase = makeCreateParameter();
  const { parameter } = await useCase.execute({ key, value });

  return res.status(201).json(parameter);
}
