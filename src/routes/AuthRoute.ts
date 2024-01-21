import { Router } from 'express'
import { login, refreshtoken, register } from '../controllers/AuthController'

export const AuthRoute: Router = Router()

AuthRoute.post('/register', register)
AuthRoute.post('/login', login)
AuthRoute.post('/refresh_token', refreshtoken)
