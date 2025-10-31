import { Router } from 'express'
import { Login, Create, Delete, GetAll, Update } from '../controllers/admin.controller'
import { adminAuthenticate, checkRole } from '../middlewares/admin.auth'

export const AdminRoute: Router = Router()

AdminRoute.get('/', adminAuthenticate, checkRole(['SuperAdmin']), GetAll)
AdminRoute.post('/create', adminAuthenticate, checkRole(['SuperAdmin']), Create)
AdminRoute.put('/update/:id_admin', adminAuthenticate, checkRole(['SuperAdmin']), Update)
AdminRoute.delete('/delete/:id_admin', adminAuthenticate, checkRole(['SuperAdmin']), Delete)

AdminRoute.post('/login', Login)
