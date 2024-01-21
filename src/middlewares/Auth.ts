import { type Response, type Request, type NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { type UserToken } from '../types/usertoken.type'
import { JWT_ACCESS_TOKEN } from '../config'

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authorizationHeader: string | undefined = req?.headers.authorization

  if (!authorizationHeader) {
    return res.status(403).json({
      message: 'Access denied, no token provided'
    })
  }

  const token = authorizationHeader.split(' ')[1]

  try {
    const decoded: any = jwt.verify(token, JWT_ACCESS_TOKEN as string)
    const extendedReq = req as Request & {
      user?: UserToken
    }
    extendedReq.user = {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
      isAdmin: decoded.isAdmin
    }
    next()
  } catch (error) {
    return res.status(500).json({
      message: error
    })
  }
}

export const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
  const extendedReq = req as Request & {
    user?: UserToken
  }
  if (extendedReq.user?.isAdmin) {
    next()
  } else {
    return res.status(403).json({
      message: 'Unauthorized'
    })
  }
}
