import { type CabangType } from '../types'
import { prisma } from '../utilss/prisma'

export const GetAllCabang = async (page: number, limit: number) => {
  const offset = (page - 1) * limit

  const [data, total] = await Promise.all([
    prisma.cabang.findMany({
      skip: offset,
      take: limit,
      orderBy: {
        nama_cabang: 'asc'
      }
    }),
    prisma.cabang.count()
  ])

  return { data, total }
}

export const GetCabang = async (id_cabang: number) => {
  return await prisma.cabang.findUnique({
    where: {
      id_cabang
    }
  })
}

export const CreateCabang = async (payload: CabangType) => {
  return await prisma.cabang.create({
    data: payload
  })
}

export const UpdateCabang = async (id_cabang: number, payload: CabangType) => {
  return await prisma.cabang.update({
    where: {
      id_cabang
    },
    data: payload
  })
}

export const DeleteCabang = async (id_cabang: number) => {
  return await prisma.cabang.delete({
    where: {
      id_cabang
    }
  })
}
