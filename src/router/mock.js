/*
 * @Author: xiongsheng
 * @Date:   2017-08-03 14:37:14
 * @Last Modified by:   xiongsheng
 * @Last Modified time: 2017-08-08 15:23:45
 */

'use strict';
import express from 'express';
import { getMockResponse } from '../service/mockService';

const router = express.Router();

// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
// mock相关路由主页
router.all('/', (req, res) => {
    res.send('mock part');
});
// 获取urlName
router.all('/*', async(req, res) => {
    //mock请求发过来的参数
    const { type, systemId, projectId } = req.query;
    //需要mock的接口名
    const urlName = req.params[0];
    //得到的mock数据
    let mockData;

    mockData = await getMockResponse(systemId, projectId, urlName, type);
    res.json(mockData);
});

export default router;