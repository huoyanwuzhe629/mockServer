/*
 * @Author: xiongsheng
 * @Date:   2017-08-03 14:37:14
 * @Last Modified by:   xiongsheng
 * @Last Modified time: 2017-08-03 15:23:41
 */

'use strict';
import express from 'express';

const router = express.Router();

// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
// mock相关路由主页
router.get('/', function(req, res) {
    res.send('mock part');
});
// 获取urlName
router.get('/*', function(req, res) {
    res.send(req.params[0]);
});

export default router;