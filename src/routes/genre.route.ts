import { Router } from 'express'
import { Create, Delete, GetAll, Update } from '../controllers/genre.controller'
import { adminAuthenticate, checkRole } from '../middlewares/admin.auth'

export const GenreRoute: Router = Router()

GenreRoute.get('/', adminAuthenticate, checkRole(['SuperAdmin', 'Staff']), GetAll)
GenreRoute.post('/create', adminAuthenticate, checkRole(['SuperAdmin', 'Staff']), Create)
GenreRoute.put('/update/:id_genre', adminAuthenticate, checkRole(['SuperAdmin', 'Staff']), Update)
GenreRoute.delete('/delete/:id_genre', adminAuthenticate, checkRole(['SuperAdmin', 'Staff']), Delete)
