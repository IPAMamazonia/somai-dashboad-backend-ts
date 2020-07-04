import path from 'path'
import nodemailer from 'nodemailer'
import { host, port, user, pass } from '../config/mail.json'
import hbs from 'nodemailer-express-handlebars'

// const transport = nodemailer.createTransport({
//   host,
//   port,
//   auth: { user, pass }
// })

const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: 'developers@ipam.org.br', pass: 'D3v1pa_m21cent' }
})

transport.use(
  'compile',
  hbs({
    viewEngine: {
      extName: '.html',
      partialsDir: path.resolve('./src/resources/mail/'),
      layoutsDir: path.resolve('./src/resources/mail/'),
      defaultLayout: ''
    },
    viewPath: path.resolve('./src/resources/mail/'),
    extName: '.html'
  })
)

export default transport
