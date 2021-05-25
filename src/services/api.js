import { request, config } from 'utils';

const { api } = config;
const { SetInformationApi } = api;

export async function setInformationApi (data) {
  return request({
    url: SetInformationApi,
    method: 'post',
    data,
  });
}
