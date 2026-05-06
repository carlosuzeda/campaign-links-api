import { makeCreateProject } from "@/factories/projects/make-create-project";
import { Request, Response } from "express";


export async function createProjectController(req: Request, res: Response) {
  const { name } = req.body;
  const userId = req.userId;

  const useCase = makeCreateProject();
  const { project } = await useCase.execute({ name, userId });

  return res.status(201).json(project);
}
