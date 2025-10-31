import { z } from 'zod'

export const KursiSchema = z.object({
  nomor_kursi: z.string().min(1, 'Nomor Kursi is required').max(20, 'Max Character 20'),
  status_kursi: z.string().optional(),
  id_studio: z.number().min(1, 'Id Studio is required')
})
