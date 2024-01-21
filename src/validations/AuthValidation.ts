import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email(),
  password: z.string().min(1, 'Password is required')
})

export const registerSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255),
  email: z.string().min(1, 'Email is required').email(),
  password: z.string().min(1, 'Password is required')
})
