import { Model, DataTypes } from 'sequelize'
import bcrypt from 'bcryptjs'
import database from '../database'

const PROTECTED_ATTRIBUTES = ['password', 'token']

class User extends Model {
  public id: number
  public firstName: string
  public lastName: string
  public organization: string
  public email: string
  public password: string
}

User.init(
  {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    organization: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [0, 255],
          msg: 'Texto muito logo. Tamanho máximo permitido 255 caracteres.'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Email inválido!'
        }
      },
      unique: {
        name: 'email',
        msg: 'Endereço de email já cadastrado em nossa base de dados!'
      }
    },
    password: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize: database.connection
  }
)

// ocultar campos protegidos
User.prototype.toJSON = function () {
  const values = Object.assign({}, this.get())
  for (const p of PROTECTED_ATTRIBUTES) {
    delete values[p]
  }
  return values
}

// criptografia do password
User.addHook(
  'beforeSave',
  async (user: User): Promise<void> => {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 10)
    }
  }
)

export default User
