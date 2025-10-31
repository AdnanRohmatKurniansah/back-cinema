import { Role, StatusKursi } from '@prisma/client'

export interface AdminType {
  id_admin: number
  nama_admin: string
  username: string
  email: string
  role: Role
  id_cabang: number | null
  password: string
}

export interface AdminToken {
  id_admin: number
  nama_admin: string
  username: string
  email: string
  role: Role
  id_cabang: number | null
  created_at: Date
  updated_at: Date
}

export interface CabangType {
  id_cabang: number
  nama_cabang: string
  alamat: string
  no_telp: string
}

export interface StudioType {
  id_studio: number
  nama_studio: string
  kapasitas: number
  id_cabang: number
}

export interface KursiType {
  id_kursi: number
  nomor_kursi: string
  status_kursi: StatusKursi
  id_studio: number
}

export interface GenreType {
  id_genre: number
  nama_genre: string
}
