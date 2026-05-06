import { makeLogin } from "@/factories/auth/make-login";
import { Request, Response } from "express";


export async function loginController(req: Request, res: Response) {
  const { email, password } = req.body;

  const useCase = makeLogin();
  const { token } = await useCase.execute({ email, password });

  return res.status(200).json({ token });
}
