import jwt from 'jsonwebtoken'
import { JWT_ACCESS_TOKEN, JWT_REFRESH_TOKEN } from '../config'

export const accessToken = (id: number, name: string, email: string, isAdmin: boolean): string => {
  return jwt.sign({ id, name, email, isAdmin }, JWT_ACCESS_TOKEN as string, {
    expiresIn: '1d'
  })
}

export const refreshToken = (id: number, name: string, email: string, isAdmin: boolean): string => {
  return jwt.sign({ id, name, email, isAdmin }, JWT_REFRESH_TOKEN as string, {
    expiresIn: '30d'
  })
}
