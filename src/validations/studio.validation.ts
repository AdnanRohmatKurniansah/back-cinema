import { z } from 'zod'

export const StudioSchema = z.object({
  nama_studio: z.string().min(1, 'Nama Studio is required').max(150, 'Max Character 150'),
  kapasitas: z.number().min(1, 'Kapasitas is required'),
  id_cabang: z.number().min(1, 'Id Cabang is required')
})
