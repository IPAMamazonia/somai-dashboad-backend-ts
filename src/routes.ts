import express from 'express'
import UserController from './controllers/UserController'

const routes = express.Router()

routes.get('/users', UserController.index)
routes.get('/users/:id', UserController.show)
routes.post('/users', UserController.store)
routes.put('/users/:id', UserController.update)
routes.delete('/users/:id', UserController.destroy)
routes.post('/user/authenticate', UserController.signin)

export default routes
