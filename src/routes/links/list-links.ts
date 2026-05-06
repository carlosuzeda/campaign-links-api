import { Router } from "express";

import { listLinksController } from "@/controllers/links/list-links-controller";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { asyncHandler } from "@/utils/async-handler";

export const listLinksRoute = Router();

listLinksRoute.get(
  "/projects/:projectId/links",
  authMiddleware,
  asyncHandler(listLinksController),
);
