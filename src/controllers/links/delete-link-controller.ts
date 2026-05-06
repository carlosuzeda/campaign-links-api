import { makeDeleteLink } from "@/factories/links/make-delete-link";
import { Request, Response } from "express";

export async function deleteLinkController(req: Request, res: Response) {
  const id = req.params.id as string;
  const userId = req.userId as string;

  const useCase = makeDeleteLink();
  await useCase.execute({ linkId: id, userId });

  return res.status(204).send();
}
