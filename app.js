const express = require('express');
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')

mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.tjizq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
    , {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true
    })

mongoose.connection.on('connected', () => {
    console.log('mongoose connected!!');
})
const productsRoutes = require('./api/routes/products')
const categoriesRoutes = require('./api/routes/categories')

const companiesRoutes = require('./api/routes/companies')
const usersRoutes = require('./api/routes/users');
const { connected } = require('process');
app.use(morgan('dev'))
app.use('/upload',express.static('upload'))
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
    next()
})

app.use(express.json())

app.use('/categories', categoriesRoutes)

app.use('/products', productsRoutes)
app.use('/companies', companiesRoutes)
app.use('/users', usersRoutes)

app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;