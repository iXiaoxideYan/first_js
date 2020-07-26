require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const twsRouter = require('./routes/tws')
const bodyParser = require('body-parser')

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));           
app.use(bodyParser.json())

app.use('/tws', twsRouter);

app.get('/', function(req, res){
    res.send('It works!')
});

app.use((req, res, next) => {
    const error = new Error('not found!');
    error.status = 404;
    next(error);
});

app.listen(process.env.PORT, function(){
    console.log('Server running on localhost:' + process.env.PORT)
});