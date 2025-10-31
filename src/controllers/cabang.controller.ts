import { type Request, type Response } from 'express'
import { CreateCabang, GetCabang, DeleteCabang, GetAllCabang, UpdateCabang } from '../services/cabang.service'
import { CabangSchema } from '../validations/cabang.validation'

export const GetAll = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page || 1)
    const limit = Number(req.query.limit || 10)

    const { data, total } = await GetAllCabang(page, limit)

    return res.json({
      message: "Cabang's Data",
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

    const validationData = CabangSchema.safeParse(requestData)

    if (!validationData.success) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: validationData.error
      })
    }

    const cabang = await CreateCabang(requestData)

    return res.status(200).json({
      message: 'Cabang Data created successfully',
      data: cabang
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: error
    })
  }
}

export const Update = async (req: Request, res: Response) => {
  const id_cabang = Number(req.params.id_cabang)

  try {
    const existCabang = await GetCabang(id_cabang)

    if (!existCabang) {
      return res.status(404).json({
        message: 'Cabang data not found'
      })
    }

    const requestData = await req.body

    const validationData = CabangSchema.safeParse(requestData)

    if (!validationData.success) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: validationData.error
      })
    }

    const updatedCabang = await UpdateCabang(id_cabang, requestData)

    return res.status(200).json({
      message: 'Cabang data updated successfully',
      data: updatedCabang
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: error
    })
  }
}

export const Delete = async (req: Request, res: Response) => {
  const id_cabang = Number(req.params.id_cabang)

  try {
    const cabang = await GetCabang(id_cabang)

    if (!cabang) {
      return res.status(404).json({
        message: 'Cabang data not found'
      })
    }

    const response = await DeleteCabang(id_cabang)

    return res.status(200).json({
      message: 'Cabang data deleted successfully',
      data: response
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: error
    })
  }
}
