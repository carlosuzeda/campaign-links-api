import { makeSetRedirect } from "@/factories/redirect/make-set-redirect";
import { Request, Response } from "express";

export async function setRedirectController(req: Request, res: Response) {
  const linkId = req.params.id as string;
  const { destinationUrl } = req.body;
  const userId = req.userId as string;

  const useCase = makeSetRedirect();
  const { redirect } = await useCase.execute({
    linkId,
    destinationUrl,
    userId,
  });

  return res.status(200).json(redirect);
}
