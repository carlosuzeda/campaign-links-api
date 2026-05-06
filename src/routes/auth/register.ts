import { Router } from "express";
import { z } from "zod";

import { registerController } from "@/controllers/auth/register-controller";
import { asyncHandler } from "@/utils/async-handler";

export const registerRoute = Router();

const registerSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres."),
  email: z.email("E-mail inválido."),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres."),
});

registerRoute.post(
  "/register",
  asyncHandler(async (req, res) => {
    registerSchema.parse(req.body);
    return registerController(req, res);
  }),
);
