import { Router } from "express";

import { getProjectController } from "@/controllers/projects/get-project-controller";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { asyncHandler } from "@/utils/async-handler";

export const getProjectRoute = Router();

getProjectRoute.get("/:id", authMiddleware, asyncHandler(getProjectController));
