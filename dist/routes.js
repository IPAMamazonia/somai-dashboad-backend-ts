"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
// import UserController = require('./controllers/UserController')
var _UserController = require('./controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);

const routes = _express2.default.Router()

// routes.get('/', (req, res) => {
//   return res.json({ hello: 'World' })
// })

routes.get('/users', _UserController2.default.index)

// routes.post('/users', UserController.store)

exports. default = routes
