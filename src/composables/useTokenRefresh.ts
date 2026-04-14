import axios from 'axios';
import { requestEnv } from '@/envs';
import { useUserStore } from '@/stores/store.user';
import dayjs from 'dayjs';

const ERROR_REQ_CLEAR_USER = 'ERROR_REQ_CLEAR_USER';

const useTokenRefresh = () => {
  let originalRequest: any = null;
  const tokenStore = useTokenStore();

  // 토큰 갱신
  const refreshToken = async () => {
    try {
      const _refreshToken = tokenStore.getRefreshToken();
      if (!_refreshToken) {
        return Promise.reject(ERROR_REQ_CLEAR_USER);
      }

      const response = await axios.post(
        '/auth/refresh',
        {},
        {
          baseURL: requestEnv.baseURL,
          timeout: requestEnv.timeout,
          headers: {
            'X-LOGKEY': dayjs().format('YYYYMMDDHHmmsss') + (Math.random() + 1).toString(32).substring(7),
            'X-APIVERSION': '1',
            'X-CHANNEL': 'UI',
            'X-VNAME': 'ONLINE',
            'X-LANG': 'ko',
            'X-MID': 'P000000',
            'X-AUTH': _refreshToken,
          },
        },
      );

      const result = response.data.data;
      tokenStore.setToken(result.accessToken);
      // TODO: 프로젝트에 따라 리프레시 토큰도 설정해야하는지 확인
      // tokenStore.setRefreshToken(result.refreshToken);
      return Promise.resolve();
    } catch (error: any) {
      console.error('An error occurred when checking refresh token');
      return Promise.reject(ERROR_REQ_CLEAR_USER);
    }
  };

  // 기본 Request 재 시도
  const retryOriginalRequest = async () => {
    try {
      const accessToken = tokenStore.getToken();
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      const response = await axios(originalRequest);
      _log(response);
      return Promise.resolve(response.data);
    } catch (error: any) {
      console.error('An error occurred when retry original request.');
      return Promise.reject(error);
    }
  };

  const refresh = async (response: any) => {
    try {
      originalRequest = response.config;
      await refreshToken();
      const res = await retryOriginalRequest();
      return Promise.resolve(res);
    } catch (error: any) {
      if (error === ERROR_REQ_CLEAR_USER) {
        const message = '토큰 갱신 시 오류가 발생했습니다. 다시 로그인해 주세요.';
        console.error(message);
        tokenStore.removeToken();
        tokenStore.removeRefreshToken();

        const userStore = useUserStore();
        userStore.clearUser();

        window.$noti?.error(message);
        setTimeout(() => {
          document.location.reload();
        }, 2000);
        return Promise.reject();
      }

      const res = error.response.data ? error.response.data : error.response;
      return Promise.reject(res);
    }
  };

  return {
    refresh,
  };
};

// eslint-disable-next-line
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
  console.info(`[Request]\n`, `\theaders:`, res.config.headers || '', `\n\tdata: `, res.config.data || '');
  console.info(`[Response]\n`, `\theaders:`, response.headers || '', `\n\tdata: `, response.data || '');
  console.groupEnd();
}

export default useTokenRefresh;
