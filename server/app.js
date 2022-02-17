require('dotenv').config()
const express = require('express')
// const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const routes = require('./routes/apiRoutes');
const path = require("path");

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}))
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use(express.urlencoded({extended: true}))
// app.use(cookieParser())

//TODO: add "/v1"
app.use('/api', routes)


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

start()
