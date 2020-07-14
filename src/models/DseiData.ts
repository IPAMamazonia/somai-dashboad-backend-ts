import { Model, DataTypes } from 'sequelize'
// import moment from 'moment'
import database from '../database'

class DseiData extends Model {
  public id: number
  public code: number
  public date: Date
  public accumulatedCases: number
  public accumulatedDeaths: number
}

DseiData.init(
  {
    code: DataTypes.NUMBER,
    date: {
      type: DataTypes.DATE
      // get: function () {
      //   return moment(this.getDataValue('date'))
      //     .tz('America/Los_Angeles')
      //     .format('YYYY-MM-DD')
      // }
    },
    accumulatedCases: DataTypes.NUMBER,
    accumulatedDeaths: DataTypes.NUMBER
  },
  {
    sequelize: database.connection,
    schema: 'covid19'
  }
)

export default DseiData
