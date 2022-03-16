import { request, config } from 'utils';

const { api } = config;
const { LoginApi, PhoneCodeApi, PhoneLoginApi, ValidInformationApi } = api;

export async function login (data, serverError = false) {
  return request({
    url: LoginApi,
    method: 'post',
    data,
    serverError,
  });
}

export async function sendLoginCode (data) {
  return request({
    url: PhoneCodeApi,
    data,
  });
}

export async function PhoneLogin (data, serverError = false) {
  return request({
    url: PhoneLoginApi,
    method: 'post',
    data,
    serverError,
  });
}

export async function validInformation (data, serverError = false) {
  return request({
    url: ValidInformationApi,
    data,
    serverError,
  });
}
