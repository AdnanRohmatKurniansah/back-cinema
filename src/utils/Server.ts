import express, { type Request, type Application, type Response, type NextFunction } from 'express'
import cors from 'cors'
import { authenticate } from '../middlewares/Auth'
import { AuthRoute } from '../routes/AuthRoute'

const createServer = () => {
  const app: Application = express()

  app.use(express.json())
  app.use(cors())
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    next()
  })

  app.get('/', (res: Response) => {
    res.send('Hello, World!')
  })

  app.use('/api/auth', AuthRoute)

  app.get('/api/protected', authenticate, (req: Request, res: Response) => {
    res.send('Welcome to the protected route')
  })

  return app
}

export default createServer
