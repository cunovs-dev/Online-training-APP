import { request, config } from 'utils';

const { api } = config;
const { RetrievalApi, SearchCourseApi, GetRecommendApi, GetRequiredCoursesApi, GetPosterApi } = api;


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
