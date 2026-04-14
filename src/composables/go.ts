import { useCustStore } from '@/stores/store.cust';
import { isEmpty } from '@/utils/comUtils';
import Router from '@/routers';

/**
 * 페이지 이동
 * @param _path
 * @param query
 */
export default function go(_path: string, query?: Record<string, any>) {
  const custStore = useCustStore();
  let path = _path;
  if (!isEmpty(custStore.custWebUrl)) {
    path = '/' + custStore.custWebUrl + _path;
  }
  Router.push({
    path: path,
    query,
  }).catch(() => {
    document.location.reload();
  });
}

/**
 * 라우터에서 경로만 추출
 * @param _path
 * @returns
 */
export function extractRoutePath(_path: string) {
  const custStore = useCustStore();
  const custWebUrl = '/' + custStore.custWebUrl;

  return _path.substring(_path.indexOf(custWebUrl) + custWebUrl.length);
}
