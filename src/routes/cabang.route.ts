import { Router } from 'express'
import { Create, Delete, GetAll, Update } from '../controllers/cabang.controller'
import { adminAuthenticate, checkRole } from '../middlewares/admin.auth'

export const CabangRoute: Router = Router()

CabangRoute.get('/', adminAuthenticate, checkRole(['SuperAdmin']), GetAll)
CabangRoute.post('/create', adminAuthenticate, checkRole(['SuperAdmin']), Create)
CabangRoute.put('/update/:id_cabang', adminAuthenticate, checkRole(['SuperAdmin']), Update)
CabangRoute.delete('/delete/:id_cabang', adminAuthenticate, checkRole(['SuperAdmin']), Delete)
