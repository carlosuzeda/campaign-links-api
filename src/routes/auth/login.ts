import { loginController } from "@/controllers/auth/login-controller";
import { asyncHandler } from "@/utils/async-handler";
import { Router } from "express";
import { z } from "zod";

export const loginRoute = Router();

const loginSchema = z.object({
  email: z.string().email("E-mail inválido."),
  password: z.string().min(1, "Senha obrigatória."),
});

loginRoute.post(
  "/login",
  asyncHandler(async (req, res) => {
    loginSchema.parse(req.body);
    return loginController(req, res);
  }),
);
