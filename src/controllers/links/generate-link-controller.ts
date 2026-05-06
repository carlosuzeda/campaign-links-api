import { makeGenerateLink } from "@/factories/links/make-generate-link";
import { Request, Response } from "express";

export async function generateLinkController(req: Request, res: Response) {
  const id = req.params.id as string;
  const userId = req.userId as string;

  const useCase = makeGenerateLink();
  const { url } = await useCase.execute({ linkId: id, userId });

  return res.status(200).json({ url });
}
