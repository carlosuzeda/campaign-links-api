import { makeDetachParameter } from "@/factories/parameters/make-detach-parameter";
import { Request, Response } from "express";

export async function detachParameterController(req: Request, res: Response) {
  const linkId = req.params.id as string;
  const parameterId = req.params.parameterId as string;
  const userId = req.userId as string;

  const useCase = makeDetachParameter();
  await useCase.execute({ linkId, parameterId, userId });

  return res.status(204).send();
}
