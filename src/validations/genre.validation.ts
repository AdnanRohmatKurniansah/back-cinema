import { z } from 'zod'

export const GenreSchema = z.object({
  nama_genre: z.string().min(1, 'Nama Genre is required').max(80, 'Max Character 80'),
})
