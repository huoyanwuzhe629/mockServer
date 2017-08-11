/*
 * @Author: xiongsheng
 * @Date:   2017-08-07 14:37:14
 * @Last Modified by:   xiongsheng
 * @Last Modified time: 2017-08-11 13:55:04
 */

'use strict';
import fetch from 'node-fetch';
import Mock from 'mockjs';

export async function getMockResponse(systemId, projectId, urlName, type) {
    //这儿配置Starfish的接口地址,并不是跟远方约的那个，后续得改
    const params = {systemId, projectId, urlName};
    const res = await getMockData(params, type);
    return res;
}


async function fetchInterface(params) {
    const address = 'http://10.134.74.145:8163/interface/queryResponseParamsById.action';
    const data = await fetch(address, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(params)
    }).then(res => res.json());
    return data;
}


async function getMockData(params, type) {
    const data = await fetchInterface(params);
    
    if (type == 1) {
        return parseResponse(data.data[0].params, type);
    } else {
        const templateData = parseResponse(data.data[0].params, type);
        return generateData(templateData);
    }
}

//解析Starfish传过来接口的静态数据
function parseResponse(data, type) {
    const ret = {};
    data.map(item => {
        const {key, value} = getResKeyAndValueByType(item, type);
        if (item.children && item.children.length) {
            if (item.type == 'arrayObject') {
                ret[key] = [];
                ret[key].push(parseResponse(item.children, type));
            } else {
                ret[key] = parseResponse(item.children, type);
            }
        } else {
            if (item.type.indexOf('array') != '-1') {
                ret[key] = [];
                ret[key].push(value);
            } else {
                ret[key] = value;
            }

        }
    });
    return ret;
}

//根据静态还是动态来生成对应的key值和value值
function getResKeyAndValueByType(item, type) {
    let key, value;
    const defaultValueByType = getDefaultValueByType(item.type);
    if (type == 1) {
        key = item.name;
        value = item.defaultValue || defaultValueByType;
    } else {
        const mockRule = item.mockData.rule;
        const mockValue = item.mockData.value;
        if (mockRule) {
            key = `${item.name}|${mockRule}`;
            value = mockValue;
        } else {
            key = item.name;
            value = item.defaultValue || defaultValueByType;
        }
    }
    return { key, value };
}

function getDefaultValueByType(type) {
    let defaultValueByType;
    switch (type) {
        case 'number':
            defaultValueByType = 0;
            break;
        case 'string':
            defaultValueByType = '';
            break;
        case 'boolean':
            defaultValueByType = true;
            break;
        case 'object':
            defaultValueByType = {};
            break;
        case 'arrayString':
            defaultValueByType = '';
            break;
        case 'arrayNumber':
            defaultValueByType = 0;
            break;
        case 'arrayObject':
            defaultValueByType = {};
            break;
        case 'arrayBoolean':
            defaultValueByType = true;
            break;
        default:
            defaultValueByType = '';
    }
    return defaultValueByType;
}


//通过mockjs生成mock数据
const generateData = (templateData) => {
    return Mock.mock(templateData);
}