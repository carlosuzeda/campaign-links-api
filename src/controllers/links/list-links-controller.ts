import { makeListLinks } from "@/factories/links/make-list-links";
import { Request, Response } from "express";

export async function listLinksController(req: Request, res: Response) {
  const projectId = req.params.projectId as string;
  const userId = req.userId as string;

  const useCase = makeListLinks();
  const { links } = await useCase.execute({ projectId, userId });

  return res.status(200).json(links);
}
