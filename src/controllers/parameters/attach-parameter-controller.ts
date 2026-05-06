import { makeAttachParameter } from "@/factories/parameters/make-attach-parameter";
import { Request, Response } from "express";

export async function attachParameterController(req: Request, res: Response) {
  const linkId = req.params.id as string;
  const parameterId = req.params.parameterId as string;
  const userId = req.userId as string;

  const useCase = makeAttachParameter();
  const { linked } = await useCase.execute({ linkId, parameterId, userId });

  return res.status(201).json(linked);
}
