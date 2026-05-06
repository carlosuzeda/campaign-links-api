import { makeListProjects } from "@/factories/projects/make-list-projects";
import { Request, Response } from "express";

export async function listProjectsController(req: Request, res: Response) {
  const userId = req.userId;

  const useCase = makeListProjects();
  const { projects } = await useCase.execute(userId);

  return res.status(200).json(projects);
}
