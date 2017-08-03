/*
 * @Author: xiongsheng
 * @Date:   2017-08-03 15:24:33
 * @Last Modified by:   xiongsheng
 * @Last Modified time: 2017-08-03 16:24:39
 */

'use strict';

import request from 'superagent';
import { expect } from 'chai';

describe('mock.test.js - 异步测试', () => {
    it('mock路由后的路径应该返回回来', (done) => {
        request
            .get('http://localhost:3000/mock/test/test/1919192.action')
            .end((err, res) => {
                expect(res.text).to.be.equal('test/test/1919192.action');
                done();
            });
    });
});