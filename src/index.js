/*
 * @Author: xiongsheng
 * @Date:   2017-08-02 16:26:19
 * @Last Modified by:   xiongsheng
 * @Last Modified time: 2017-08-03 17:45:29
 */

'use strict';

import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from'body-parser';
import indexRouter from './router/index';
import mockRouter from './router/mock';


const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//配置路由
app.use('/', indexRouter);
app.use('/mock', mockRouter);

// catch 404 and forward to error handler
app.use((req, res, next)=> {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next)=> {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
  res.send('error')
});


const server = app.listen(3000, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log(`Example app listening at http://${host}:${port}`);
});