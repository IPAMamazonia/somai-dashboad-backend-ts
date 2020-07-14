import express, { Request, Response } from 'express'
import authMiddleware from './middlewares/auth'
import UserController from './controllers/userController'
import DseiDataController from './controllers/dseiDataController'

const baseUrl = '/api/v1'

const routes = express.Router()

// ROTAS SEM AUTENTICAÇÃO
// -----------------------

// user
routes.get(`${baseUrl}/users`, UserController.index)
routes.get(`${baseUrl}/user/:id`, UserController.show)
routes.post(`${baseUrl}/user`, UserController.store)
routes.post(`${baseUrl}/user/authenticate`, UserController.signin)
routes.post(`${baseUrl}/user/forgot_password`, UserController.forgotPassword)
routes.post(`${baseUrl}/user/reset_password`, UserController.resetPassword)

// dsei data
routes.get(`${baseUrl}/dsei`, (req: Request, res: Response) => {
  // retorna os dados de DSEI por página e limite
  if (req.query.page && req.query.limit) {
    return DseiDataController.show(req, res)
  }

  // retorna a soma de um DSEI
  if (req.query.code && req.query.sum && req.query.sum === 'true') {
    return DseiDataController.sumOne(req, res)
  }

  // retorna os dados de um DSEI
  if (req.query.code) {
    return DseiDataController.dsei(req, res)
  }

  // retorna a soma por data de todos os DSEI
  if (req.query.sum_by_date) {
    return DseiDataController.sumByDate(req, res)
  }

  // retorna a soma de todos os DSEI
  if (req.query.sum_all && req.query.sum_all === 'true') {
    return DseiDataController.sumAll(req, res)
  }

  // retorna todos os dados de DSEI
  return DseiDataController.index(req, res)
})

routes.post(`${baseUrl}/dsei`, DseiDataController.store)
routes.delete(`${baseUrl}/dsei/:id`, DseiDataController.destroy)

// ROTAS COM AUTENTICAÇÃO
// -----------------------
routes.use(authMiddleware)

// user
routes.put(`${baseUrl}/user/:id`, UserController.update)
routes.delete(`${baseUrl}/user/:id`, UserController.destroy)

export default routes
