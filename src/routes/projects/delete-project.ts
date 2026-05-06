import { deleteProjectController } from "@/controllers/projects/delete-project-controller";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { asyncHandler } from "@/utils/async-handler";
import { Router } from "express";


export const deleteProjectRoute = Router();

deleteProjectRoute.delete(
  "/:id",
  authMiddleware,
  asyncHandler(deleteProjectController),
);
