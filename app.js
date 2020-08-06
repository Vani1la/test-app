const express = require('express')
const path = require('path')
const app = express()
const Router = express.Router()
const bodyParser = require('body-parser')


const mainRoute = require('./routers/mainRouter')
const delUserRoute = require('./routers/delUserRouter')
const delCarRoute = require('./routers/delCarRouter')
const addUserRoute = require('./routers/addUserRouter')
const addCarRoute = require('./routers/addCarRouter')
const userRoute = require('./routers/userRouter')
const carRoute = require('./routers/carRouter')


app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')
app.set('views', './views')



app.use('/', mainRoute)
app.use('/del-user', delUserRoute)
app.use('/del-car', delCarRoute)
app.use('/add-user', addUserRoute)
app.use('/add-car', addCarRoute)
app.use('/user', userRoute)
app.use('/car', carRoute)

app.listen(3000, () => console.log('Сервер запущен!'))