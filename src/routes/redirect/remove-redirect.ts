import { removeRedirectController } from "@/controllers/redirect/remove-redirect-controller";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { asyncHandler } from "@/utils/async-handler";
import { Router } from "express";

export const removeRedirectRoute = Router();

removeRedirectRoute.delete(
  "/links/:id/redirect",
  authMiddleware,
  asyncHandler(removeRedirectController),
);
