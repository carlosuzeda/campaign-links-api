import { updateLinkController } from "@/controllers/links/update-link-controller";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { asyncHandler } from "@/utils/async-handler";
import { Router } from "express";
import { z } from "zod";

export const updateLinkRoute = Router();

const updateLinkSchema = z.object({
  name: z.string().min(1).optional(),
  baseUrl: z.string().url("URL base inválida.").optional(),
});

updateLinkRoute.put(
  "/links/:id",
  authMiddleware,
  asyncHandler(async (req, res) => {
    updateLinkSchema.parse(req.body);
    return updateLinkController(req, res);
  }),
);
