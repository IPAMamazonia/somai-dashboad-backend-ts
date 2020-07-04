import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import authConfig from '../config/auth.json'
import User from '../models/User'
import mailer from '../modules/mailer'

interface IParams {
  id?: number
}

function generateToken (params: IParams = {}) {
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

  // cadastra um usuário
  public async store (req: Request, res: Response): Promise<Response> {
    const user = await User.sync()
      .then(async () => {
        return await User.create(req.body)
      })
      .catch((error) => res.status(400).json(error))

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
      .catch((error) => res.status(400).json(error))

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

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Senha inválida' })
    }

    res.json({
      user,
      token: generateToken({ id: user.id })
    })
  }

  // esqueceu senha
  public async forgotPassword (req: Request, res: Response): Promise<Response> {
    const { email } = req.body

    try {
      const user = await User.findOne({ where: { email } })

      if (!user) {
        return res.status(400).json({ message: 'Usuário não encontrado' })
      }

      const token = crypto.randomBytes(20).toString('hex')

      const now = new Date()
      now.setHours(now.getHours() + 1)

      await User.update(
        {
          passwordResetToken: token,
          passwordResetExpires: now
        },
        { where: { id: user.id } }
      )

      mailer.sendMail(
        {
          to: email,
          from: 'derlly@ipam.org.br',
          subject: 'SOMAI - RECUPERAR SENHA',
          template: 'auth/forgot_password',
          context: { token, email, ENV_APP_URL: process.env.APP_URL }
        },
        (err) => {
          if (err) {
            return res.status(400).json({
              message: 'Não foi possível enivar o email de recupar a senha'
            })
          }

          return res.json({ message: 'Acesse seu email para resetar a senha.' })
        }
      )
    } catch (error) {
      res
        .status(400)
        .json({ message: 'Erro ao recuperar senha, tente novamente' })
    }
  }

  // resetar senha
  public async resetPassword (req: Request, res: Response): Promise<Response> {
    const { email, token, password } = req.body

    try {
      const user = await User.findOne({ where: { email } })

      if (!user) {
        return res.status(400).json({ message: 'Usuário não encontrado' })
      }

      if (token !== user.passwordResetToken) {
        return res.status(400).json({ message: 'Token inválido' })
      }

      const now = new Date()

      if (now > user.passwordResetExpires) {
        return res
          .status(400)
          .json({ message: 'Token expirado, gere um novo token' })
      }

      user.password = password

      await user.save()

      res.json({ message: 'Senha alterada com sucesso' })
    } catch (error) {
      res
        .status(400)
        .json({ message: 'Não foi possível resetar a senha, tente novamente' })
    }
  }
}

export default new UserController()
