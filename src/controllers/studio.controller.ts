import { type Request, type Response } from 'express'
import { CreateStudio, GetStudio, DeleteStudio, GetAllStudio, UpdateStudio } from '../services/studio.service'
import { StudioSchema } from '../validations/studio.validation'
import { GetCabang } from '../services/cabang.service'

export const GetAll = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page || 1)
    const limit = Number(req.query.limit || 10)

    const { data, total } = await GetAllStudio(page, limit)

    return res.json({
      message: "Studio's Data",
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

    const validationData = StudioSchema.safeParse(requestData)

    if (!validationData.success) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: validationData.error
      })
    }

    const existCabang = await GetCabang(requestData.id_cabang)

    if (!existCabang) {
      return res.status(404).json({
        message: 'Selected Cabang not found'
      })
    }

    const cabang = await CreateStudio(requestData)

    return res.status(200).json({
      message: 'Studio Data created successfully',
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
  const id_studio = Number(req.params.id_studio)

  try {
    const existStudio = await GetStudio(id_studio)

    if (!existStudio) {
      return res.status(404).json({
        message: 'Studio data not found'
      })
    }

    const requestData = await req.body

    const validationData = StudioSchema.safeParse(requestData)

    if (!validationData.success) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: validationData.error
      })
    }

    const existCabang = await GetCabang(requestData.id_cabang)

    if (!existCabang) {
      return res.status(404).json({
        message: 'Selected Cabang not found'
      })
    }

    const updatedStudio = await UpdateStudio(id_studio, requestData)

    return res.status(200).json({
      message: 'Studio data updated successfully',
      data: updatedStudio
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: error
    })
  }
}

export const Delete = async (req: Request, res: Response) => {
  const id_studio = Number(req.params.id_studio)

  try {
    const cabang = await GetStudio(id_studio)

    if (!cabang) {
      return res.status(404).json({
        message: 'Studio data not found'
      })
    }

    const response = await DeleteStudio(id_studio)

    return res.status(200).json({
      message: 'Studio data deleted successfully',
      data: response
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: error
    })
  }
}
