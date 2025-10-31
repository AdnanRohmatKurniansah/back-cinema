import { z } from 'zod'

export const AdminSchema = z.object({
  nama_admin: z.string().min(1, 'Nama Admin is required').max(150, 'Max Character 150'),
  username: z.string().min(1, 'Username is required').max(70, 'Max Character 70'),
  email: z.email().min(1, 'Email is required').max(100, 'Max Character 100'),
  role: z.string(),
  id_cabang: z.number().nullable().optional(),
  password: z.string().min(1, 'Password is required')
})

export const AdminLoginSchema = z.object({
  username: z.string().min(1, 'Username is required').max(70, 'Max Character 70'),
  password: z.string().min(1, 'Password is required')
})
