import express, { type Request, type Application, type Response, type NextFunction } from 'express'
import cors from 'cors'
import { AdminRoute } from '../routes/admin.route'
import swaggerUi from 'swagger-ui-express'
import fs from 'fs'
import path from 'path'
import { CabangRoute } from '../routes/cabang.route'
import { StudioRoute } from '../routes/studio.route'
import { KursiRoute } from '../routes/kursi.route'
import { GenreRoute } from '../routes/genre.route'

const createServer = () => {
  const swaggerFile = fs.readFileSync(path.join(__dirname, '../docs/swagger.json'), 'utf-8')
  const swaggerDocument = JSON.parse(swaggerFile)

  const app: Application = express()

  app.use(express.json())
  app.use(cors())
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    next()
  })

  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
      swaggerOptions: {
        persistAuthorization: true
      }
    })
  )

  app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!')
  })

  app.use('/api/admin', AdminRoute)
  app.use('/api/cabang', CabangRoute)
  app.use('/api/studio', StudioRoute)
  app.use('/api/kursi', KursiRoute)
  app.use('/api/genre', GenreRoute)

  // app.get('/api/protected', authenticate, (req: Request, res: Response) => {
  //   res.send('Welcome to the protected route')
  // })

  return app
}

export default createServer
