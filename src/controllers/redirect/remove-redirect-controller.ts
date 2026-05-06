import { makeRemoveRedirect } from "@/factories/redirect/make-remove-redirect";
import { Request, Response } from "express";

export async function removeRedirectController(req: Request, res: Response) {
  const linkId = req.params.id as string;
  const userId = req.userId as string;

  const useCase = makeRemoveRedirect();
  await useCase.execute({ linkId, userId });

  return res.status(204).send();
}
