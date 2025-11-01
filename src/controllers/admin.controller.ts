import { type Request, type Response } from 'express'
import { AdminLoginSchema, AdminSchema } from '../validations/admin.validation'
import { compare, hash } from 'bcrypt'
import { AdminAccessToken } from '../utils/generateToken'
import { GetUniqueAdmin, CreateAdmin, GetAdmin, DeleteAdmin, GetAllAdmin, UpdateAdmin } from '../services/admin.service'
import { AdminToken } from '../types'

export const Login = async (req: Request, res: Response) => {
  try {
    const requestData = await req.body

    const validationData = AdminLoginSchema.safeParse(requestData)

    if (!validationData.success) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: validationData.error
      })
    }

    const adminExist = await GetUniqueAdmin(requestData.username)

    if (!adminExist) {
      return res.status(404).json({
        message: 'Admin doesnt exist'
      })
    }

    const auth = await compare(requestData.password, adminExist.password)

    if (auth) {
      const token: string = AdminAccessToken(adminExist)

      return res.status(200).json({
        message: 'Login successfully',
        token: `Bearer ${token}`
      })
    } else {
      return res.status(401).json({
        message: 'Invalid credentials'
      })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: error
    })
  }
}

export const GetAll = async (req: Request, res: Response) => {
  try {
    const extendedReq = req as Request & {
      admin: AdminToken
    }
    const currentAdminId = extendedReq.admin.id_admin

    const page = Number(req.query.page || 1)
    const limit = Number(req.query.limit || 10)

    const { data, total } = await GetAllAdmin(currentAdminId, page, limit)

    return res.json({
      message: "Admin's Data",
      data,
      total,
      page,
      limit
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: error
    })
  }
}

export const Create = async (req: Request, res: Response) => {
  try {
    const requestData = await req.body

    const validationData = AdminSchema.safeParse(requestData)

    if (!validationData.success) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: validationData.error
      })
    }

    const adminExist = await GetUniqueAdmin(requestData.username)

    if (adminExist) {
      return res.status(409).json({
        message: 'Username already exist'
      })
    }

    const hashedPassword = await hash(requestData.password, 10)

    requestData.password = hashedPassword
    const admin = await CreateAdmin(requestData)

    return res.status(200).json({
      message: 'Admin Data created successfully',
      data: admin
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: error
    })
  }
}

export const Update = async (req: Request, res: Response) => {
  const id_admin = Number(req.params.id_admin)

  try {
    const existAdmin = await GetAdmin(id_admin)

    if (!existAdmin) {
      return res.status(404).json({
        message: 'Admin data not found'
      })
    }

    const requestData = await req.body

    const validationData = AdminSchema.safeParse(requestData)

    if (!validationData.success) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: validationData.error
      })
    }

    if (requestData.username !== existAdmin.username) {
      const adminExist = await GetUniqueAdmin(requestData.username)

      if (adminExist) {
        return res.status(409).json({
          message: 'Username already exist'
        })
      }
    }

    if (requestData.password) {
      const hashedPassword = await hash(requestData.password, 10)
      requestData.password = hashedPassword
    }

    const payload = {
      username: requestData.username ?? existAdmin.username,
      nama_admin: requestData.nama_admin ?? existAdmin.nama_admin,
      email: requestData.email ?? existAdmin.email,
      password: requestData.password ?? existAdmin.password,
      role: requestData.role ?? existAdmin.role,
      id_cabang: requestData.id_cabang ?? existAdmin.id_cabang,
      updated_at: new Date()
    }

    const updatedAdmin = await UpdateAdmin(id_admin, payload)

    return res.status(200).json({
      message: 'Admin data updated successfully',
      data: updatedAdmin
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: error
    })
  }
}

export const Delete = async (req: Request, res: Response) => {
  const id_admin = Number(req.params.id_admin)

  try {
    const admin = await GetAdmin(id_admin)

    if (!admin) {
      return res.status(404).json({
        message: 'Admin data not found'
      })
    }

    const response = await DeleteAdmin(id_admin)

    return res.status(200).json({
      message: 'Admin data deleted successfully',
      data: response
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: error
    })
  }
}
