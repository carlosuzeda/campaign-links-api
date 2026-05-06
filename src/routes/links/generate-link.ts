import { generateLinkController } from "@/controllers/links/generate-link-controller";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { asyncHandler } from "@/utils/async-handler";
import { Router } from "express";

export const generateLinkRoute = Router();

generateLinkRoute.get(
  "/links/:id/generate",
  authMiddleware,
  asyncHandler(generateLinkController),
);
