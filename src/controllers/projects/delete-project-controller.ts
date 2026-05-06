import { makeDeleteProject } from "@/factories/projects/make-delete-project";
import { Request, Response } from "express";

export async function deleteProjectController(req: Request, res: Response) {
  const id = req.params.id as string;
  const userId = req.userId as string;

  const useCase = makeDeleteProject();
  await useCase.execute({ projectId: id, userId });

  return res.status(204).send();
}
