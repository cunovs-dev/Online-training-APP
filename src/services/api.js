import { request, config } from 'utils';

const { api } = config;
const { SetInformationApi, GetCourseApi, CollectionApi, PraiseApi, PayApi, GetUserInfo } = api;

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
