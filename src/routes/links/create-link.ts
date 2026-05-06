import { createLinkController } from "@/controllers/links/create-link-controller";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { asyncHandler } from "@/utils/async-handler";
import { Router } from "express";
import { z } from "zod";

export const createLinkRoute = Router();

const createLinkSchema = z.object({
  name: z.string().min(1, "Nome do link obrigatório."),
  baseUrl: z.string().url("URL base inválida."),
});

createLinkRoute.post(
  "/projects/:projectId/links",
  authMiddleware,
  asyncHandler(async (req, res) => {
    createLinkSchema.parse(req.body);
    return createLinkController(req, res);
  }),
);
