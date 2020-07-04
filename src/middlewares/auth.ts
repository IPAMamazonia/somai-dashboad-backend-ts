import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import authConfig from '../config/auth.json'

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        interface Request {
            userId: number
        }
    }
}

interface IParams {
  id?: number
}

const auth = (req: Request, res: Response, next: NextFunction): Response => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).send({ message: 'No token provided' })
  }

  const parts = authHeader.split(' ')

  if (parts.length !== 2) {
    return res.status(401).send({ message: 'Token error' })
  }

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ message: 'Token malformatted' })
  }

  jwt.verify(token, authConfig.secret, (err, decoded: IParams) => {
    if (err) return res.status(401).send({ message: 'Token invalid' })

    req.userId = decoded.id
    return next()
  })
}

export default auth
