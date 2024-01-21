import { type UserType } from '../types/user.type'
import { prisma } from '../utils/Prisma'

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email
    }
  })
}

export const addUser = async (payload: UserType) => {
  return await prisma.user.create({
    data: payload
  })
}
