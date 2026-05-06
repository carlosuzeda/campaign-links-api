import { detachParameterController } from "@/controllers/parameters/detach-parameter-controller";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { asyncHandler } from "@/utils/async-handler";
import { Router } from "express";

export const detachParameterRoute = Router();

detachParameterRoute.delete(
  "/links/:id/parameters/:parameterId",
  authMiddleware,
  asyncHandler(detachParameterController),
);
