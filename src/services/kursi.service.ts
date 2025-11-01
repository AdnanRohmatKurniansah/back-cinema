import { type KursiType } from '../types'
import { prisma } from '../utilss/prisma'

export const GetAllKursi = async (page: number, limit: number) => {
  const offset = (page - 1) * limit

  const [data, total] = await Promise.all([
    prisma.kursi.findMany({
      skip: offset,
      take: limit,
      orderBy: {
        nomor_kursi: 'asc'
      }
    }),
    prisma.kursi.count()
  ])

  return { data, total }
}

export const GetKursi = async (id_kursi: number) => {
  return await prisma.kursi.findUnique({
    where: {
      id_kursi
    }
  })
}

export const GetUniqueKursi = async (nomor_kursi: string) => {
  return await prisma.kursi.findUnique({
    where: {
      nomor_kursi
    }
  })
}

export const CreateKursi = async (payload: KursiType) => {
  return await prisma.kursi.create({
    data: payload
  })
}

export const UpdateKursi = async (id_kursi: number, payload: KursiType) => {
  return await prisma.kursi.update({
    where: {
      id_kursi
    },
    data: payload
  })
}

export const DeleteKursi = async (id_kursi: number) => {
  return await prisma.kursi.delete({
    where: {
      id_kursi
    }
  })
}
