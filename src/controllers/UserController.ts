import { Request, Response, DataTypes } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import authConfig from '../config/auth.json'
import User from '../models/User'
import { Instance } from 'sequelize'

function generateToken (params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400
  })
}

class UserController {
  // retorna todos os usuários
  public async index (req: Request, res: Response): Promise<Response> {
    const users = await User.findAll()

    return res.json(users)
  }

  // retorna um usuário pelo id
  public async show (req: Request, res: Response): Promise<Response> {
    const users = await User.findByPk(req.params.id)

    return res.json(users)
  }

  // salva um usuário
  public async store (req: Request, res: Response): Promise<Response> {
    const user = await User.sync()
      .then(async () => {
        return await User.create(req.body)
      })
      .catch(error => res.status(400).json(error))

    return res.json({
      user,
      token: generateToken({ id: user.get('id') })
    })
  }

  // altera um usuário
  public async update (req: Request, res: Response): Promise<Response> {
    const userUpdate = await User.sync()
      .then(async () => {
        return await User.update(req.body, { where: { id: req.params.id } })
      })
      .catch(error => res.status(400).json(error))

    return res.json(userUpdate)
  }

  // deleta um usuário
  public async destroy (req: Request, res: Response): Promise<Response> {
    await User.destroy({ where: { id: req.params.id } })

    return res.json({ message: 'Deletado com sucesso!' })
  }

  // login do usuário
  public async signin (req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })

    if (!user) {
      return res.status(400).json({ message: 'Usuário não encontrado' })
    }

    if (!await bcrypt.compare(password, user.password)) {
      return res.status(400).json({ message: 'Senha inválida' })
    }

    res.json({
      user,
      token: generateToken({ id: user.id })
    })
  }
}

export default new UserController()
