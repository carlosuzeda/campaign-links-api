import { attachParameterController } from '@/controllers/parameters/attach-parameter-controller'
import { authMiddleware } from '@/middlewares/auth.middleware'
import { asyncHandler } from '@/utils/async-handler'
import { Router } from 'express'


export const attachParameterRoute = Router()

attachParameterRoute.post(
  '/links/:id/parameters/:parameterId',
  authMiddleware,
  asyncHandler(attachParameterController)
)