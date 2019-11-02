const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const userRouter = require('./routes/UserRoute');
const authenRouter = require('./routes/AuthenRoute');
const cors = require("cors");
const passport = require('passport');
const axios = require('axios');
require('./authentication/passport');
const app = express();

const sockIO = require('socket.io')();
app.sockIO = sockIO;

// sockIO.on('connection', function(socket){
//     console.log('A client connection occurred!');
// });
// ############ init MySQL Connection ############
const mysql = require('./utilities/mysql');
(async () => {
    try {
        await mysql.initConnection();
        console.log('### MySQL Connected ###');
    } catch (e) {
        console.error('### MySQL Connection Failed :' + e);
        process.exit();
    }
})();

// ########### init Redis Connection ############
const redis = require('./utilities/redis');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use('/', userRouter);
app.use('/auth', authenRouter);


app.get('/status', (req, res) => {
    res.status(200).json({
        returnCode: 1
    })
});

app.get('/', (req,res) => {
    res.render('index', {
        title: 'test'
    });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
require('./utilities/socketio');