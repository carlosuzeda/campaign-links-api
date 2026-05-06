import { Router } from "express";

import { listProjectsController } from "@/controllers/projects/list-projects-controller";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { asyncHandler } from "@/utils/async-handler";

export const listProjectsRoute = Router();

listProjectsRoute.get(
  "/",
  authMiddleware,
  asyncHandler(listProjectsController),
);
