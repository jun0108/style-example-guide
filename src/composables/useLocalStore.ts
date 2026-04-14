import { frameworkEnv } from '@/envs';

const CUST_URL_KEY = 'CUST_URL_' + frameworkEnv.name.toLocaleUpperCase();
const TOKEN_KEY = 'TOKEN_' + frameworkEnv.name.toLocaleUpperCase();
const REFRESH_TOKEN_KEY = 'REFRESH_' + frameworkEnv.name.toLocaleUpperCase();

// 로컬 스토리지
export function getLocalStore(key: string) {
  const data = localStorage.getItem(key);
  let value: any = data;
  try {
    if (data) {
      value = JSON.parse(data);
    }
  } catch (e) {}
  return value;
}

export function setLocalStore(key: string, data: any) {
  let value = data;
  if (typeof data !== 'string') {
    value = JSON.stringify(data);
  }
  localStorage.setItem(key, value);
}

export function removeLocalStore(key: string) {
  localStorage.removeItem(key);
}

export function useLocalStore() {
  return {
    get: getLocalStore,
    set: setLocalStore,
    remove: removeLocalStore,
  };
}

// 토큰 관련 로컬 스토리지
export function getToken() {
  return getLocalStore(TOKEN_KEY);
}

export function setToken(token: string) {
  setLocalStore(TOKEN_KEY, token);
}

export function removeToken() {
  removeLocalStore(TOKEN_KEY);
}
export function getRefreshToken() {
  return getLocalStore(REFRESH_TOKEN_KEY);
}

export function setRefreshToken(token: string) {
  setLocalStore(REFRESH_TOKEN_KEY, token);
}

export function removeRefreshToken() {
  removeLocalStore(REFRESH_TOKEN_KEY);
}

export function getCustUrl() {
  return getLocalStore(CUST_URL_KEY);
}

export function setCustUrl(custUrl: string) {
  setLocalStore(CUST_URL_KEY, custUrl);
}

export function removeCustUrl() {
  removeLocalStore(CUST_URL_KEY);
}

export function useTokenStore() {
  return {
    getToken,
    setToken,
    removeToken,
    getRefreshToken,
    setRefreshToken,
    removeRefreshToken,
  };
}
