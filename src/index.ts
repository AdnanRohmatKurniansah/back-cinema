import { PORT } from './config'
import createServer from './utilss/server'

const app = createServer()

app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`)
  console.log(`Swagger docs running in port ${PORT} /api/docs`)
})
