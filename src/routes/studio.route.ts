import { Router } from 'express'
import { Create, Delete, GetAll, Update } from '../controllers/studio.controller'
import { adminAuthenticate, checkRole } from '../middlewares/admin.auth'

export const StudioRoute: Router = Router()

StudioRoute.get('/', adminAuthenticate, checkRole(['SuperAdmin']), GetAll)
StudioRoute.post('/create', adminAuthenticate, checkRole(['SuperAdmin']), Create)
StudioRoute.put('/update/:id_studio', adminAuthenticate, checkRole(['SuperAdmin']), Update)
StudioRoute.delete('/delete/:id_studio', adminAuthenticate, checkRole(['SuperAdmin']), Delete)
