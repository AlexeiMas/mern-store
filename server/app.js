require('dotenv').config()
const express = require('express')
// const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const routes = require('./routes');
const path = require("path");
const Admin = require("./models/Admin")
const bcrypt = require("bcryptjs")

const PORT = process.env.PORT || 5000

const app = express()
const corsOptions = {
  origin:'*',
  credentials:true,            //access-control-allow-credentials:true
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204
}
app.use(cors(corsOptions))
// app.use(cors({
//   origin: process.env.CLIENT_URL,
//   credentials: true
// }))
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use(express.urlencoded({extended: true}))
// app.use(cookieParser())

app.use('/api/v1', routes)

//Last middleware - Error
app.use(errorHandler)

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    app.listen(PORT, () => {
      console.log(`Server was started on ${PORT} port ...`)
      console.log('http://localhost:5000')
    })
  } catch (e) {
    console.log('Server error', e.message)
    process.exit(1)
  }
}

start().then(async () => {
  const admin = await Admin.exists({})
  if (!admin) {
    const encryptPassword = bcrypt.hashSync(process.env.DEFAULT_PASSWORD, 5)
    await Admin.create({
      name: process.env.DEFAULT_ADMIN,
      email: process.env.DEFAULT_EMAIL,
      password: encryptPassword
    })
  }
})
