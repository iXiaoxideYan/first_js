require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const twsRouter = require('./routes/web/tws');
const twsApiRouter = require('./routes/api/tws');
const path = require('path');

const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));           
app.use(bodyParser.json());

app.engine('.hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'main'
}));
app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/tws', twsRouter);
app.use('/api/tws', twsApiRouter);

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