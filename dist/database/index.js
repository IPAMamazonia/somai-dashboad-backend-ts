"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');

var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);

class Database {
  

  constructor () {
    this.init()
  }

  init () {
    this.connection = new (0, _sequelize.Sequelize)(_database2.default)
  }
}

const database = new Database()

exports. default = database
