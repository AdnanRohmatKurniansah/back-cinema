import { type Request, type Response } from 'express'
import { CreateKursi, GetKursi, DeleteKursi, GetAllKursi, UpdateKursi, GetUniqueKursi } from '../services/kursi.service'
import { KursiSchema } from '../validations/kursi.validation'
import { GetStudio } from '../services/studio.service'

export const GetAll = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page || 1)
    const limit = Number(req.query.limit || 10)

    const { data, total } = await GetAllKursi(page, limit)

    return res.json({
      message: "Kursi's Data",
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

    const validationData = KursiSchema.safeParse(requestData)

    if (!validationData.success) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: validationData.error
      })
    }

    const existKursi = await GetUniqueKursi(requestData.nomor_kursi)

    if (existKursi) {
      return res.status(409).json({
        message: 'Kursi already exist'
      })
    }

    const existStudio = await GetStudio(requestData.id_studio)

    if (!existStudio) {
      return res.status(404).json({
        message: 'Selected Studio not found'
      })
    }

    const cabang = await CreateKursi(requestData)

    return res.status(200).json({
      message: 'Kursi Data created successfully',
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
  const id_kursi = Number(req.params.id_kursi)

  try {
    const existKursi = await GetKursi(id_kursi)

    if (!existKursi) {
      return res.status(404).json({
        message: 'Kursi data not found'
      })
    }

    const requestData = await req.body

    const validationData = KursiSchema.safeParse(requestData)

    if (!validationData.success) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: validationData.error
      })
    }

    if (requestData.nomor_kursi !== existKursi.nomor_kursi) {
      const nomorKursi = await GetUniqueKursi(requestData.nomor_kursi)

      if (nomorKursi) {
        return res.status(409).json({
          message: 'Kursi already exist'
        })
      }
    }

    const existStudio = await GetStudio(requestData.id_studio)

    if (!existStudio) {
      return res.status(404).json({
        message: 'Selected Studio not found'
      })
    }

    const updatedKursi = await UpdateKursi(id_kursi, requestData)

    return res.status(200).json({
      message: 'Kursi data updated successfully',
      data: updatedKursi
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: error
    })
  }
}

export const Delete = async (req: Request, res: Response) => {
  const id_kursi = Number(req.params.id_kursi)

  try {
    const cabang = await GetKursi(id_kursi)

    if (!cabang) {
      return res.status(404).json({
        message: 'Kursi data not found'
      })
    }

    const response = await DeleteKursi(id_kursi)

    return res.status(200).json({
      message: 'Kursi data deleted successfully',
      data: response
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: error
    })
  }
}
