import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { axiosConfig } from '@/config';
import { AxiosResponseCommon } from '@/interface';
import { Log } from '@/utils/log';
import store from '@/store';
import { rootMutations } from '@/store/types';

const AxiosRequestAxiosInstance = axios.create(axiosConfig);
const pending: Array<{
  url: string;
  cancel: () => void;
}> = [];
const { CancelToken } = axios;
function removePending(config: AxiosRequestConfig) {
  pending.map((p, index) => {
    if (p.url === `${config.url}&request_type=${config.method}`) {
      p.cancel();
      // 删除已取消
      pending.slice(index, 1);
    }
  });
}
AxiosRequestAxiosInstance.interceptors.request.use((config) => {
  // removePending(config);
  config.cancelToken = new CancelToken((c) => {
    pending.push({ url: `${config.url}&request_type=${config.method}`, cancel: c });
  });
  return config;
});

AxiosRequestAxiosInstance.interceptors.response.use(
  (res: AxiosResponse<AxiosResponseCommon<any>>) => {
    // removePending(res.config);
    // 后端返回success不为true报错
    if (!res.data.success) {
      store.commit(rootMutations.SHOW_SNACK_BAR, {message: res.data.error_msg});
      Log.log(res.data.error_msg);
      return Promise.reject(new Error(res.data.error_msg));
    }
    return res;
  },
  (err) => {
    if (err.message) {
      store.commit(rootMutations.SHOW_SNACK_BAR, {message: err.message});
      Log.err(err.message);
    } else {
      Log.err(err);
    }
    return Promise.reject(err);
  },
);

export const request = AxiosRequestAxiosInstance;
