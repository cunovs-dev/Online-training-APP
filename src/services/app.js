/*
 * @Author: your name
 * @Date: 2021-12-08 10:04:29
 * @LastEditTime: 2021-12-14 16:05:27
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ChinaMobile-app\src\services\app.js
 */
import { request, config } from 'utils';

const { api: { LogoutApi, GetDirectionApi, GetBaseInfo } } = config;

export async function queryAppBase (payload) {
  return request({
    url: GetBaseInfo,
    method: 'get',
    data: payload,
  });
}

export async function queryDirection (payload) {
  return request({
    url: GetDirectionApi,
    method: 'get',
    data: payload,
  });
}

export async function logout () {
  return request({
    url: LogoutApi,
    method: 'get',
  });
}

