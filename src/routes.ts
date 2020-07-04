import express from 'express'
import authMiddleware from './middlewares/auth'
import UserController from './controllers/userController'
import ProjectController from './controllers/projectController'

const baseUrl = '/api/v1'

const routes = express.Router()

// USER
routes.get(`${baseUrl}/users`, UserController.index)
routes.get(`${baseUrl}/user/:id`, UserController.show)
routes.post(`${baseUrl}/user`, UserController.store)
routes.post(`${baseUrl}/user/authenticate`, UserController.signin)
routes.post(`${baseUrl}/user/forgot_password`, UserController.forgotPassword)
routes.post(`${baseUrl}/user/reset_password`, UserController.resetPassword)
routes.use(authMiddleware).put(`${baseUrl}/user/:id`, UserController.update)
routes.use(authMiddleware).delete(`${baseUrl}/user/:id`, UserController.destroy)

// DASHBORD
routes.use(authMiddleware).get(`${baseUrl}/project`, ProjectController.index)

export default routes
