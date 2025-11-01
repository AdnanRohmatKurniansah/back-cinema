import { type GenreType } from '../types'
import { prisma } from '../utils/prisma'

export const GetAllGenre = async (page: number, limit: number) => {
  const offset = (page - 1) * limit

  const [data, total] = await Promise.all([
    prisma.genre.findMany({
      skip: offset,
      take: limit,
      orderBy: {
        nama_genre: 'asc'
      }
    }),
    prisma.genre.count()
  ])

  return { data, total }
}

export const GetGenre = async (id_genre: number) => {
  return await prisma.genre.findUnique({
    where: {
      id_genre
    }
  })
}

export const GetUniqueGenre = async (nama_genre: string) => {
  return await prisma.genre.findUnique({
    where: {
      nama_genre
    }
  })
}

export const CreateGenre = async (payload: GenreType) => {
  return await prisma.genre.create({
    data: payload
  })
}

export const UpdateGenre = async (id_genre: number, payload: GenreType) => {
  return await prisma.genre.update({
    where: {
      id_genre
    },
    data: payload
  })
}

export const DeleteGenre = async (id_genre: number) => {
  return await prisma.genre.delete({
    where: {
      id_genre
    }
  })
}
