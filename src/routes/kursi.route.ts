import { Router } from 'express'
import { Create, Delete, GetAll, Update } from '../controllers/kursi.controller'
import { adminAuthenticate, checkRole } from '../middlewares/admin.auth'

export const KursiRoute: Router = Router()

KursiRoute.get('/', adminAuthenticate, checkRole(['SuperAdmin']), GetAll)
KursiRoute.post('/create', adminAuthenticate, checkRole(['SuperAdmin']), Create)
KursiRoute.put('/update/:id_kursi', adminAuthenticate, checkRole(['SuperAdmin']), Update)
KursiRoute.delete('/delete/:id_kursi', adminAuthenticate, checkRole(['SuperAdmin']), Delete)
