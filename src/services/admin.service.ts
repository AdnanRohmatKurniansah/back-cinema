import { type AdminType } from '../types'
import { prisma } from '../utils/prisma'

export const GetAllAdmin = async (currentAdminId: number, page: number, limit: number) => {
  const offset = (page - 1) * limit

  const [data, total] = await Promise.all([
    prisma.admin.findMany({
      where: {
        NOT: {
          id_admin: currentAdminId
        }
      },
      skip: offset,
      take: limit,
      orderBy: {
        nama_admin: 'asc'
      }
    }),
    prisma.admin.count()
  ])

  return { data, total }
}

export const GetAdmin = async (id_admin: number) => {
  return await prisma.admin.findUnique({
    where: {
      id_admin
    }
  })
}

export const GetUniqueAdmin = async (username: string) => {
  return await prisma.admin.findUnique({
    where: {
      username
    }
  })
}

export const CreateAdmin = async (payload: AdminType) => {
  return await prisma.admin.create({
    data: payload
  })
}

export const UpdateAdmin = async (id_admin: number, payload: Partial<AdminType>) => {
  return await prisma.admin.update({
    where: {
      id_admin
    },
    data: payload
  })
}

export const DeleteAdmin = async (id_admin: number) => {
  return await prisma.admin.delete({
    where: {
      id_admin
    }
  })
}
