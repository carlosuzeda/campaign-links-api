import { makeRegister } from "@/factories/auth/make-register";
import { Request, Response } from "express";


export async function registerController(req: Request, res: Response) {
  const { name, email, password } = req.body;

  const useCase = makeRegister();
  const { user } = await useCase.execute({ name, email, password });

  return res.status(201).json({
    id: user.id,
    name: user.name,
    email: user.email,
  });
}
