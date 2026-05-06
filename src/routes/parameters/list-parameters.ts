import { listParametersController } from "@/controllers/parameters/list-parameters-controller";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { asyncHandler } from "@/utils/async-handler";
import { Router } from "express";

export const listParametersRoute = Router();

listParametersRoute.get(
  "/parameters",
  authMiddleware,
  asyncHandler(listParametersController),
);
