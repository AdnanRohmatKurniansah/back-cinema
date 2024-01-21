import { type Request, type Response } from 'express'
import { loginSchema, registerSchema } from '../validations/AuthValidation'
import { compare, hash } from 'bcrypt'
import { accessToken, refreshToken } from '../utils/GenerateToken'
import jwt from 'jsonwebtoken'
import { JWT_REFRESH_TOKEN } from '../config'
import { getUserByEmail, addUser } from '../services/AuthService'

export const register = async (req: Request, res: Response) => {
  try {
    const requestData = await req.body

    const validationData = registerSchema.safeParse(requestData)

    if (!validationData.success) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: validationData.error.errors
      })
    }

    const userExist = await getUserByEmail(requestData.email)

    if (userExist) {
      return res.status(409).json({
        message: 'Email already exist'
      })
    }

    const hashedPassword = await hash(requestData.password, 10)

    requestData.password = hashedPassword
    const user = await addUser(requestData)

    return res.status(200).json({
      message: 'Register successfully',
      data: user
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: error
    })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const requestData = await req.body

    const validationData = loginSchema.safeParse(requestData)

    if (!validationData.success) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: validationData.error.errors
      })
    }

    const userExist = await getUserByEmail(requestData.email)

    if (!userExist) {
      return res.status(404).json({
        message: 'User doesnt exist'
      })
    }

    const auth = await compare(requestData.password, userExist.password)

    if (auth) {
      const token: string = accessToken(userExist.id, userExist.name, userExist.email, userExist.isAdmin)
      const refreshtoken: string = refreshToken(userExist.id, userExist.name, userExist.email, userExist.isAdmin)

      return res.status(200).json({
        message: 'Login successfully',
        token: `Bearer ${token}`,
        refreshToken: `Bearer ${refreshtoken}`
      })
    } else {
      return res.status(401).json({
        message: 'Invalid credentials'
      })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: error
    })
  }
}

export const refreshtoken = async (req: Request, res: Response) => {
  const refreshToken: string | undefined = req?.body.refreshToken

  if (!refreshToken) {
    return res.status(403).json({
      message: 'Access denied, no refresh token provided'
    })
  }

  const token = refreshToken.split(' ')[1]

  try {
    const decoded: any = jwt.verify(token, JWT_REFRESH_TOKEN as string)
    const accesstoken = accessToken(decoded.id, decoded.name, decoded.email, decoded.isAdmin)

    return res.status(200).json({
      message: 'New access token has been created',
      data: `Bearer ${accesstoken}`
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: error
    })
  }
}
