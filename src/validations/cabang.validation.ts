import { z } from 'zod'

export const CabangSchema = z.object({
  nama_cabang: z.string().min(1, 'Nama Cabang is required').max(150, 'Max Character 150'),
  alamat: z.string().min(1, 'Username is required').max(100, 'Max Character 100'),
  no_telp: z.string().min(1, 'No Telp is required').max(20, 'Max Character 20')
})
