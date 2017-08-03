/*
* @Author: xiongsheng
* @Date:   2017-08-03 17:37:26
* @Last Modified by:   xiongsheng
* @Last Modified time: 2017-08-03 17:39:07
*/

'use strict';

import express from 'express';

const router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('welcome to mockServer!')
});

module.exports = router;
