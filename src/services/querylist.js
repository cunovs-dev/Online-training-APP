/*
 * @Author: your name
 * @Date: 2021-12-08 10:04:29
 * @LastEditTime: 2021-12-16 16:31:23
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ChinaMobile-app\src\services\querylist.js
 */
import { request, config } from 'utils';

const { api } = config;
const { RetrievalApi, SearchApi, GetRecommendApi, GetRank, GetRequiredCoursesApi, GetPosterApi, GetHistoryApi, GetPraise, CollectionApi, PayApi, GetLntegralList, GetReply } = api;


export async function queryPoster (payload) {
  return request({
    url: GetPosterApi,
    method: 'get',
    data: payload,
  });
}


export async function queryRequiredCourses (payload) {
  return request({
    url: GetRequiredCoursesApi,
    method: 'get',
    data: payload,
  });
}


export async function queryRecommend (payload) {
  return request({
    url: GetRecommendApi,
    method: 'get',
    data: payload,
  });
}

export async function queryHistory (payload) {
  return request({
    url: GetHistoryApi,
    method: 'get',
    data: payload,
  });
}

export async function queryCollection (payload) {
  return request({
    url: CollectionApi,
    method: 'get',
    data: payload,
  });
}

export async function queryPayList (payload) {
  return request({
    url: PayApi,
    method: 'get',
    data: payload,
  });
}


export async function queryReplyList (payload) {
  return request({
    url: GetReply,
    method: 'get',
    data: payload,
  });
}

export async function queryVideoList (payload) {
  const { id, type, nowPage = 1, pageSize = 10, sort = 0 } = payload;
  return request({
    url: `${RetrievalApi}/${type}/${id}?nowPage=${nowPage}&pageSize=${pageSize}&sort=${sort}`,
  });
}

export async function search (data) {
  const { nowPage = 1, pageSize = 10, } = data;
  return request({
    url: `${SearchApi}?nowPage=${nowPage}&pageSize=${pageSize}`,
    method: 'post',
    data,
  });
}


export async function queryLntegralList (payload) {
  return request({
    url: GetLntegralList,
    method: 'get',
    data: payload,
  });
}

export async function queryRank (payload) {
  return request({
    url: GetRank,
    method: 'get',
    data: payload,
  });
}

export async function queryPraise (payload) {
  return request({
    url: GetPraise,
    method: 'get',
    data: payload,
  });
}
