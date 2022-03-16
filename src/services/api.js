/*
 * @Author: your name
 * @Date: 2021-12-08 10:04:29
 * @LastEditTime: 2021-12-14 17:14:39
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ChinaMobile-app\src\services\api.js
 */
import { request, config } from 'utils';

const { api } = config;
const { SetInformationApi, GetCourseApi, CollectionApi, PraiseApi, PayApi, GetUserInfo, GetFile, GetFileList, GetFileType, sendReply, SetTime, GetTest, SendTest } = api;

export async function setInformationApi (data) {
  return request({
    url: SetInformationApi,
    method: 'post',
    data,
  });
}

export async function queryCourse (payload) {
  return request({
    url: `${GetCourseApi}`,
    data: payload,
  });
}

export async function queryCollection (payload) {
  return request({
    url: CollectionApi,
    data: payload,
  });
}

export async function collect (data) {
  return request({
    url: CollectionApi,
    method: 'post',
    data,
  });
}

export async function praise (data) {
  return request({
    url: PraiseApi,
    method: 'post',
    data,
  });
}

export async function payCourse (data) {
  return request({
    url: PayApi,
    method: 'post',
    data,
  });
}

export async function queryUserInfo (payload) {
  return request({
    url: GetUserInfo,
    data: payload,
  });
}

export async function queryFile (payload) {
  const { id } = payload;
  return request({
    url: `${GetFile}/${id}`,
  });
}

export async function queryFileList (payload) {
  return request({
    url: GetFileList,
    data: payload,
  });
}

export async function queryFileType (payload) {
  return request({
    url: GetFileType,
    data: payload,
  });
}

export async function reply (data) {
  return request({
    url: sendReply,
    method: 'post',
    data,
  });
}

export async function queryTest (payload) {
  return request({
    url: GetTest,
    data: payload,
  });
}

export async function sendTest (data) {
  return request({
    url: SendTest,
    method: 'post',
    data,
  });
}

export async function setTime (data) {
  return request({
    url: SetTime,
    method: 'post',
    data,
  });
}
