import { type Request, type Response } from 'express'
import { CreateGenre, GetGenre, DeleteGenre, GetAllGenre, UpdateGenre, GetUniqueGenre } from '../services/genre.service'
import { GenreSchema } from '../validations/genre.validation'

export const GetAll = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page || 1)
    const limit = Number(req.query.limit || 10)

    const { data, total } = await GetAllGenre(page, limit)

    return res.json({
      message: "Genre's Data",
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

    const validationData = GenreSchema.safeParse(requestData)

    if (!validationData.success) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: validationData.error
      })
    }

    const existGenre = await GetUniqueGenre(requestData.nama_genre)

    if (existGenre) {
      return res.status(409).json({
        message: 'Genre already exist'
      })
    }

    const cabang = await CreateGenre(requestData)

    return res.status(200).json({
      message: 'Genre Data created successfully',
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
  const id_genre = Number(req.params.id_genre)

  try {
    const existGenre = await GetGenre(id_genre)

    if (!existGenre) {
      return res.status(404).json({
        message: 'Genre data not found'
      })
    }

    const requestData = await req.body

    const validationData = GenreSchema.safeParse(requestData)

    if (!validationData.success) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: validationData.error
      })
    }

    if (requestData.nama_genre !== existGenre.nama_genre) {
        const namaGenre = await GetUniqueGenre(requestData.nama_genre)
    
        if (namaGenre) {
          return res.status(409).json({
            message: 'Genre already exist'
          })
        }
    }

    const updatedGenre = await UpdateGenre(id_genre, requestData)

    return res.status(200).json({
      message: 'Genre data updated successfully',
      data: updatedGenre
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
    const cabang = await GetGenre(id_cabang)

    if (!cabang) {
      return res.status(404).json({
        message: 'Genre data not found'
      })
    }

    const response = await DeleteGenre(id_cabang)

    return res.status(200).json({
      message: 'Genre data deleted successfully',
      data: response
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: error
    })
  }
}
