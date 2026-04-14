import type { DevEntrStatus, DevStatus } from '@/types/service/type.dev';

const DEV_STATUS_LIST = [
  { value: 'WEAK', name: '약전계', color: 'orange', orderby: 2 },
  { value: 'NORMAL', name: '온라인', color: 'green', orderby: 1 },
  { value: 'OFF', name: '오프라인', color: 'gray', orderby: 0 },
] as {
  value: DevStatus;
  name: string;
  color: string;
  orderby: number;
}[];

/**
 * 단말 상태
 * @returns
 */
export function getDevStatusList() {
  return DEV_STATUS_LIST;
}

/**
 * 단말 상태명
 * @param devStatus
 * @returns
 */
export function getDevStatusNm(devStatus: DevStatus) {
  return DEV_STATUS_LIST.find((_i) => _i.value === devStatus)?.name || '';
}

/**
 * 단말 상태 색상
 * @param devStatus
 * @returns
 */
export function getDevStatusChipColor(devStatus: DevStatus) {
  return DEV_STATUS_LIST.find((_i) => _i.value === devStatus)?.color || '';
}

/**
 * 단말 상태별 orderby map
 * @returns
 */
export function getDevStatusOrderbyMap() {
  return new Map<DevStatus, number>(DEV_STATUS_LIST.map((_i) => [_i.value, _i.orderby]));
}

/**
 * 단말 가입 상태명
 * @param statusCd
 */
export function getEntrStatusNm(statusCd: DevEntrStatus) {
  const statusMap = {
    A: '개통',
    C: '일시정지',
  };
  return statusMap[statusCd] || '';
}
