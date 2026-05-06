import { setRedirectController } from "@/controllers/redirect/set-redirect-controller";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { asyncHandler } from "@/utils/async-handler";
import { Router } from "express";
import { z } from "zod";

export const setRedirectRoute = Router();

const setRedirectSchema = z.object({
  destinationUrl: z.string().url("URL de destino inválida."),
});

setRedirectRoute.post(
  "/links/:id/redirect",
  authMiddleware,
  asyncHandler(async (req, res) => {
    setRedirectSchema.parse(req.body);
    return setRedirectController(req, res);
  }),
);
