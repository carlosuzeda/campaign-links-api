import { createProjectController } from "@/controllers/projects/create-project-controller";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { asyncHandler } from "@/utils/async-handler";
import { Router } from "express";
import { z } from "zod";

export const createProjectRoute = Router();

const createProjectSchema = z.object({
  name: z.string().min(1, "Nome do projeto obrigatório."),
});

createProjectRoute.post(
  "/",
  authMiddleware,
  asyncHandler(async (req, res) => {
    createProjectSchema.parse(req.body);
    return createProjectController(req, res);
  }),
);
