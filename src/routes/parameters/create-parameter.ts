import { createParameterController } from "@/controllers/parameters/create-parameter-controller";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { asyncHandler } from "@/utils/async-handler";
import { Router } from "express";
import { z } from "zod";

export const createParameterRoute = Router();

const createParameterSchema = z.object({
  key: z.string().min(1, "Chave obrigatória."),
  value: z.string().min(1, "Valor obrigatório."),
});

createParameterRoute.post(
  "/parameters",
  authMiddleware,
  asyncHandler(async (req, res) => {
    createParameterSchema.parse(req.body);
    return createParameterController(req, res);
  }),
);
