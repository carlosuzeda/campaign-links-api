import { deleteLinkController } from "@/controllers/links/delete-link-controller";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { asyncHandler } from "@/utils/async-handler";
import { Router } from "express";

export const deleteLinkRoute = Router();

deleteLinkRoute.delete(
  "/links/:id",
  authMiddleware,
  asyncHandler(deleteLinkController),
);
