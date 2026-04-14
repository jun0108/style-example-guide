import { requestEnv } from '@/envs';
import { useFrameworkStore } from '@/stores/store.framework';
import { useUserStore } from '@/stores/store.user';
import type { RequestApi } from '@/types/common/type.request';
import { isEmpty } from '@/utils/comUtils';
import axios, { AxiosError, type AxiosInstance, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import dayjs from 'dayjs';

declare module 'axios' {
  export interface AxiosRequestConfig {
    logKey?: string;
    meta?: HttpServiceMeta;
  }
}

const { baseURL, timeout } = requestEnv;

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

function _log(res: any) {
  if (!requestEnv.useAxiosConsoleLog) {
    return false;
  }

  const response = res.response ? res.response : res;
  const color = response.status === 200 ? '#58FA58' : '#FA5858';
  const status = response.status ? response.status : res.message;

  console.groupCollapsed(
    `%c[${status}]`,
    `background-color: ${color}; color: black`,
    `[${res.config.method}] - ${res.config.url}`,
  );
  console.info(
    `[Request]\n`,
    `\theaders:`,
    res.config.headers || '',
    `\n\tdata: `,
    res.config.data || '',
    `\n\tlogKey: `,
    res.config.meta?.logKey,
  );
  console.info(`[Response]\n`, `\theaders:`, response.headers || '', `\n\tdata: `, response.data || '');
  console.groupEnd();
}

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const logKey = dayjs().format('YYYYMMDDHHmmsss') + (Math.random() + 1).toString(32).substring(7);
    config.meta = Object.assign({}, requestEnv.meta, config.meta || {});

    // ============================== custom ==============================
    config.headers['X-LOGKEY'] = logKey;

    if (config.meta.useToken && isEmpty(config.headers['X-AUTH']) && getToken()) {
      config.headers['X-AUTH'] = getToken();
    }
    config.headers['X-APIVERSION'] = '1';
    config.headers['X-CHANNEL'] = 'UI';
    config.headers['X-VNAME'] = 'ONLINE';
    config.headers['X-LANG'] = 'ko';
    // ============================== // custom ==============================

    if (config.meta.useLoader) {
      const frameworkStore = useFrameworkStore();
      frameworkStore.pushLoading(logKey);
    }

    return { ...config, logKey };
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    _log(response);

    const { config } = response;
    if (config.meta?.useLoader && config.logKey) {
      const frameworkStore = useFrameworkStore();
      frameworkStore.popLoading(config.logKey);
    }

    if (response.status === 200 && !config.meta?.responseAll) {
      return response.data;
    }
    return response;
  },
  (error: AxiosError) => {
    _log(error);

    const { response, config } = error;

    const frameworkStore = useFrameworkStore();

    if (config?.meta?.useLoader && config.logKey) {
      frameworkStore.popLoading(config.logKey);
    }

    if (!response || !response.data) {
      window.$noti?.error('네트워크 연결이 원활하지 않습니다. 잠시 후 다시 시도하세요!');

      if (error.code === 'ECONNABORTED') {
        frameworkStore.clearLoading();
        document.location.replace(import.meta.env.BASE_URL + '/500');
      }
      return Promise.reject(error);
    }

    const { useRefresh } = config?.meta || {};
    if (response.status === 401) {
      if (useRefresh !== false) {
        // use refresh
        const tokenRefresh = useTokenRefresh();
        return tokenRefresh.refresh(error);
      } else {
        // Not use refresh
        window.$noti?.error('로그인이 만료되어 로그아웃 됩니다.');
        setTimeout(() => {
          const userStore = useUserStore();
          userStore.logout();
        }, 1500);
      }
    }

    // 오류 처리
    if (config?.meta?.useNotification) {
      const message = (response.data as RequestResponse).result.desc || '데이터 처리 오류가 발생했습니다.';
      window.$noti?.error(message);
    }

    return Promise.reject(response.data);
  },
);

// function formatJsonToUrlParams(data: { [key: string]: string }) {
//   return typeof data === 'object'
//     ? Object.keys(data)
//         .map((key) => {
//           return `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`;
//         })
//         .join('&')
//     : '';
// }

// 공통 X-MID 설정
function setHeaderXMid(config: AxiosRequestConfig = {}, xMid: string) {
  if (config.headers) {
    config.headers['X-MID'] = xMid;
  } else {
    config.headers = { 'X-MID': xMid };
  }
  return config;
}

const request: RequestApi = {
  get: (options) => {
    const config = setHeaderXMid(options.config, options.xMid);
    return axiosInstance.get(options.url, { params: options.params, ...config });
  },
  post: (options) => {
    const config = setHeaderXMid(options.config, options.xMid);
    return axiosInstance.post(options.url, options.data, config);
  },
  put: (options) => {
    const config = setHeaderXMid(options.config, options.xMid);
    return axiosInstance.put(options.url, options.data, config);
  },
  delete: (options) => {
    const config = setHeaderXMid(options.config, options.xMid);
    return axiosInstance.delete(options.url, { data: options.data, ...config });
  },
  upload: (options) => {
    const config = setHeaderXMid(
      { headers: { 'Content-Type': 'multipart/form-data' }, ...options.config },
      options.xMid,
    );
    return axiosInstance.post(options.url, options.data, config);
  },
  download: (options) => {
    const config = setHeaderXMid(
      { meta: { responseAll: true }, ...options.config, responseType: 'arraybuffer' },
      options.xMid,
    );

    axiosInstance
      .post(options.url, options.data, config)
      .then((res) => {
        const blob = new Blob([res.data], { type: res.headers['content-type'] });
        let fileName = _getFileName(res.headers['content-disposition']);
        fileName = decodeURI(fileName);
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.target = '_self';
        if (fileName) {
          link.download = fileName;
        }
        link.click();
      })
      .catch();
  },
};

function _getFileName(contentDisposition: any) {
  const fileName = contentDisposition
    .split(';')
    .filter((i: any) => i.indexOf('fileName') > -1 || i.indexOf('filename') > -1)
    .map((i: any) => i.replace(/"/g, '').split('=')[1]);
  return fileName[0] ? fileName[0] : null;
}

export default request;
