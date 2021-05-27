import { request, config } from 'utils';

const { api } = config;
const { RetrievalApi, SearchApi, GetRecommendApi, GetRequiredCoursesApi, GetPosterApi, GetHistoryApi, CollectionApi } = api;


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

export async function queryVideoList (payload) {
  const { id, type, nowPage = 1, pageSize = 10, sort = 0 } = payload;
  return request({
    url: `${RetrievalApi}/${type}/${id}?nowPage=${nowPage}&pageSize=${pageSize}&sort=${sort}`,
  });
}

export async function search (data) {
  return request({
    url: SearchApi,
    method: 'post',
    data,
  });
}

