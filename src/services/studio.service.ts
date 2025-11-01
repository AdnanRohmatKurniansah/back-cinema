import { type StudioType } from '../types'
import { prisma } from '../utilss/prisma'

export const GetAllStudio = async (page: number, limit: number) => {
  const offset = (page - 1) * limit

  const [data, total] = await Promise.all([
    prisma.studio.findMany({
      skip: offset,
      take: limit,
      orderBy: {
        nama_studio: 'asc'
      }
    }),
    prisma.studio.count()
  ])

  return { data, total }
}

export const GetStudio = async (id_studio: number) => {
  return await prisma.studio.findUnique({
    where: {
      id_studio
    }
  })
}

export const CreateStudio = async (payload: StudioType) => {
  return await prisma.studio.create({
    data: payload
  })
}

export const UpdateStudio = async (id_studio: number, payload: StudioType) => {
  return await prisma.studio.update({
    where: {
      id_studio
    },
    data: payload
  })
}

export const DeleteStudio = async (id_studio: number) => {
  return await prisma.studio.delete({
    where: {
      id_studio
    }
  })
}
