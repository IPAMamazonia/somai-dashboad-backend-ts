import path from 'path'
import nodemailer from 'nodemailer'
import hbs from 'nodemailer-express-handlebars'

const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
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
