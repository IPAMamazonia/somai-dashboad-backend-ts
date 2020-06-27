"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _database = require('../database'); var _database2 = _interopRequireDefault(_database);

class User extends _sequelize.Model {
  
  
  
}

User.init(
  {
    name: _sequelize.DataTypes.STRING,
    email: _sequelize.DataTypes.STRING
  },
  {
    sequelize: _database2.default.connection
  }
)

exports. default = User
