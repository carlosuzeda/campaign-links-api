import { makeCreateLink } from "@/factories/links/make-create-link";
import { Request, Response } from "express";

export async function createLinkController(req: Request, res: Response) {
  const { name, baseUrl } = req.body;
  const projectId = req.params.projectId as string;
  const userId = req.userId as string;

  const useCase = makeCreateLink();
  const { link } = await useCase.execute({ name, baseUrl, projectId, userId });

  return res.status(201).json(link);
}
