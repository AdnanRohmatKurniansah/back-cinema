import { type Response, type Request, type NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { JWT_ACCESS_TOKEN } from '../config'
import { AdminToken } from '../types'
import { GetAdmin } from '../services/admin.service'

export const adminAuthenticate = async (req: Request, res: Response, next: NextFunction) => {
  const authorizationHeader: string | undefined = req?.headers.authorization

  if (!authorizationHeader) {
    return res.status(403).json({
      message: 'Access denied, no token provided'
    })
  }

  const token = authorizationHeader.split(' ')[1]

  try {
    const decoded: any = jwt.verify(token, JWT_ACCESS_TOKEN as string)

    const admin = await GetAdmin(decoded.id_admin)

    if (!admin) {
      return res.status(401).json({
        message: 'Invalid token, admin not found'
      })
    }

    const extendedReq = req as Request & {
      admin?: AdminToken
    }

    extendedReq.admin = {
      id_admin: admin.id_admin,
      username: admin.username,
      nama_admin: admin.nama_admin,
      email: admin.email,
      role: admin.role,
      id_cabang: admin.id_cabang,
      created_at: admin.created_at,
      updated_at: admin.updated_at
    }

    next()
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid token',
      error
    })
  }
}

export const checkRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const extendedReq = req as Request & {
      admin?: AdminToken
    }

    if (!extendedReq.admin) {
      return res.status(401).json({
        message: 'Unauthorized'
      })
    }

    const userRole = extendedReq.admin.role

    if (roles.includes(userRole)) {
      return next()
    }

    return res.status(403).json({
      message: `Access denied. Required role: ${roles.join(' or ')}`
    })
  }
}
