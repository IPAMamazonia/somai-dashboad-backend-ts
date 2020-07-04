import { Sequelize } from 'sequelize'
import dbConfig from '../config/database'

class Database {
  public connection: Sequelize

  constructor () {
    this.init()
  }

  init (): void {
    this.connection = new Sequelize(dbConfig)
  }
}

const database: Database = new Database()

export default database
