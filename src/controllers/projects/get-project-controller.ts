import { makeGetProject } from "@/factories/projects/make-get-project";
import { Request, Response } from "express";

export async function getProjectController(req: Request, res: Response) {
  const id = req.params.id as string;
  const userId = req.userId as string;

  const useCase = makeGetProject();
  const { project } = await useCase.execute({ projectId: id, userId });

  return res.status(200).json(project);
}
