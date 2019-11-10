require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const {NODE_ENV} = require('./config');
const childrenRouter = require('../src/Children/Children-Router')
const flyersRouter = require('../src/Flyers/Flyers-Router')


const app = express();

const morganOption = (NODE_ENV === 'production') ? 'tiny' : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.get('/', (req,res) => {
    res.send('Hello, world!')
});

app.use('/api/children', childrenRouter)
app.use('/api/flyers', flyersRouter)

app.use(function errorHandler(error, req, res, next){
    let response
    if(NODE_ENV === 'production') {
        response = {error: {message: 'server error'}}
    }
    else {
        console.error(error)
        response = {message: error.message}
    }
    response.status(500).json(response)
})

module.exports = app;
