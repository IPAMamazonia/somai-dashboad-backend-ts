import { Model, DataTypes } from 'sequelize'
import database from '../database'
import DseiData from './DseiData'

class Dsei extends Model {
  public id: number
  public name: string
  public code: number
}

Dsei.init(
  {
    name: DataTypes.STRING,
    code: {
      type: DataTypes.NUMBER,
      primaryKey: true
    }
  },
  {
    sequelize: database.connection,
    freezeTableName: true, // mantém o nome da tabela singular
    tableName: 'dsei', // nome da tabela
    timestamps: false,
    schema: 'covid19'
  }
)

Dsei.hasMany(DseiData, { foreignKey: 'code', as: 'dseidata' })
DseiData.belongsTo(Dsei, { foreignKey: 'code' })

export default Dsei
