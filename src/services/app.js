import { request, config } from 'utils';

const { api: { AppBaseApi, LogoutApi, GetDirectionApi,  } } = config;

export async function queryAppbase (payload) {
  return request({
    url: AppBaseApi,
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



