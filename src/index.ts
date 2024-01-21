import { PORT } from './config'
import createServer from './utils/Server'

const app = createServer()

app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`)
})
