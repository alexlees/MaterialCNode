import qs from 'qs';
import { AxiosRequestConfig } from 'axios';

export const axiosConfig: AxiosRequestConfig = {
  baseURL: 'https://cnodejs.org/api/v1/',
  // QueryString对象序列化
  paramsSerializer(params: any) {
    return qs.stringify(params);
  },
  timeout: 3000,
  responseType: 'json',
  validateStatus(status: number) {
    return status >= 200 && status < 500;
  },
  // xsrfCookieName: 'csrfToken',
  // xsrfHeaderName: 'x-csrf-token',
  // withCredentials: true,
};

export const DEV_ACCESSTOKEN = '242a99fa-5415-4d9b-b2c3-1adae7974a01';
