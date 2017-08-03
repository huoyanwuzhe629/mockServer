/*
 * @Author: xiongsheng
 * @Date:   2017-08-02 16:26:19
 * @Last Modified by:   xiongsheng
 * @Last Modified time: 2017-08-03 14:46:17
 */

'use strict';

import express from 'express';
import mockRouter from './router/mock';

const app = express();

app.all('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/mock', mockRouter);


const server = app.listen(3000, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log(`Example app listening at http://${host}:${port}`);
});