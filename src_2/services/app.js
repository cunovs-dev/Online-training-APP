import { request, config } from 'utils';

const { api: {  LogoutApi, GetDirectionApi,GetBaseInfo  } } = config;

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



