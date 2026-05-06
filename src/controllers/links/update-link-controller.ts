import { makeUpdateLink } from "@/factories/links/make-update-link";
import { Request, Response } from "express";

export async function updateLinkController(req: Request, res: Response) {
  const id = req.params.id as string;
  const { name, baseUrl } = req.body;
  const userId = req.userId as string;

  const useCase = makeUpdateLink();
  const { link } = await useCase.execute({ linkId: id, userId, name, baseUrl });

  return res.status(200).json(link);
}
