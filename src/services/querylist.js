import { request, config } from 'utils';

const { api } = config;
const { GetVocationalApi, RetrievalApi, SearchCourseApi, GetRecommendApi, GetRequiredCoursesApi, GetPosterApi, GetSceneApi } = api;

export async function queryVocational (payload) {
  return request({
    url: GetVocationalApi,
    method: 'get',
    data: payload,
  });
}

export async function queryScene (payload) {
  return request({
    url: GetSceneApi,
    method: 'get',
    data: payload,
  });
}


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


export async function queryVideoList (payload) {
  const { id, type } = payload;
  return request({
    url: `${RetrievalApi}/${type}/${id}`,
  });
}
