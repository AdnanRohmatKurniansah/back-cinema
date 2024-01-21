import { config } from 'dotenv'

config()

export const NODE_ENV = process.env.NODE_ENV
export const DATABASE_URL = process.env.DATABASE_URL
export const PORT = process.env.PORT
export const JWT_ACCESS_TOKEN = process.env.JWT_ACCESS_TOKEN
export const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN
