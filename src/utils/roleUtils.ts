import { isEmpty } from './comUtils';
import { menuEnv } from '@/envs';

const ROLE_LIST: Role[] = [
  // 유플러스
  { roleCdId: 'GN00000618', roleLabel: '관리자', roleKey: 'LGU', roleVal: 'ADMIN', custTypeCdId: 'GN00000613' },
  { roleCdId: 'GN00000619', roleLabel: '일반 사용자', roleKey: 'LGU', roleVal: 'USER', custTypeCdId: 'GN00000613' },
  // 대리점
  { roleCdId: 'GN00000620', roleLabel: '관리자', roleKey: 'DEAL', roleVal: 'ADMIN', custTypeCdId: 'GN00000614' },
  { roleCdId: 'GN00000621', roleLabel: '일반 사용자', roleKey: 'DEAL', roleVal: 'USER', custTypeCdId: 'GN00000614' },
  // 고객사
  { roleCdId: 'GN00000623', roleLabel: '관리자', roleKey: 'CUST', roleVal: 'ADMIN', custTypeCdId: 'GN00000615' },
  { roleCdId: 'GN00000624', roleLabel: '일반 사용자', roleKey: 'CUST', roleVal: 'USER', custTypeCdId: 'GN00000615' },
  // 제조사
  { roleCdId: 'GN00000625', roleLabel: '관리자', roleKey: 'MANF', roleVal: 'ADMIN', custTypeCdId: 'GN00000616' },
  { roleCdId: 'GN00000626', roleLabel: '일반 사용자', roleKey: 'MANF', roleVal: 'USER', custTypeCdId: 'GN00000616' },
];

// 승인 상태 코드
const APPROVAL_STATUS = {
  WAITING: 'GN00000672', // GN00000672: 대기중
  APPROVED: 'GN00000673', // GN00000673: 승인
  REJECTED: 'GN00000674', // GN00000674: 반려
};

// 고객사 유형 코드
const CUST_TYPE_CD_ID: Record<CustTypeKey, CustTypeCdId> = {
  LGU: 'GN00000613',
  DEAL: 'GN00000614',
  CUST: 'GN00000615',
  MANF: 'GN00000616',
};

/**
 * 승인 권한 라벨 가져오기 ('관리자', '일반 사용자')
 * @param roleCdId
 * @returns
 */
export function getRoleLabel(roleCdId?: string) {
  if (isEmpty(roleCdId)) {
    return '';
  }

  return ROLE_LIST.find((_r) => _r.roleCdId === roleCdId)?.roleLabel ?? '';
}

/**
 * 승인 권한 공통 코드 가져오기
 * @param type - 사용자 유형 ('CUST' | 'MANF')
 * @param auth - 권한 유형 ('admin' | 'user')
 * @returns
 */
export function getRoleCdId(roleKey: RoleKey, roleVal: RoleVal) {
  return (
    ROLE_LIST.find((_r) => _r.roleKey === roleKey.toLocaleUpperCase() && _r.roleVal === roleVal.toLocaleUpperCase())
      ?.roleCdId ?? ''
  );
}

/**
 * 권한 코드로 AuthType 가져오기
 * @param roleCdId
 * @returns
 */
export function getAuthType(roleCdId?: string): AuthType {
  return (ROLE_LIST.find((_r) => _r.roleCdId === roleCdId)?.roleVal.toLocaleLowerCase() as AuthType) ?? 'admin';
}

/**
 * 승인 상태 코드 가져오기
 * @param key - 'WAITING' | 'APPROVED' | 'REJECTED'
 * @returns 'GN00000672' | 'GN00000673' | 'GN00000674' | ''
 */
export function getApprovalStatus(key: string) {
  return (APPROVAL_STATUS as Record<string, string>)[key] ?? '';
}

/**
 * 고객사 유형 가져오기
 * @param key - 'LGU' | 'DEAL' | 'CUST' | 'MANF'
 * @returns 'GN00000613' | 'GN00000614' | 'GN00000615' | 'GN00000616'
 */
export function getCustTypeCdId(key: CustTypeKey) {
  return CUST_TYPE_CD_ID[key] ?? '';
}

/**
 * 고객사 권한 옵션 가져오기
 * @param key - 'GN00000613' | 'GN00000614' | 'GN00000615' | 'GN00000616'
 * @returns
 */
export function getCustRoleOptions(custTypeCdId: CustTypeCdId) {
  return ROLE_LIST.filter((_r) => _r.custTypeCdId === custTypeCdId).map((_r) => ({
    value: _r.roleCdId,
    label: _r.roleLabel,
  }));
}

/**
 * 접근 불가 메뉴 조회
 * @param roleKey RoleKeyMgmt
 * @param roleVal  RoleVal
 * @returns
 */
export function getAccessDeniedMenus(roleKey: RoleKeyMgmt, roleVal: RoleVal): string[] {
  return menuEnv.accessDenied[roleKey][roleVal].menus ?? [];
}

/**
 * 접근 불가 화면 조회
 * @param roleKey  RoleKeyMgmt
 * @param roleVal  RoleVal
 * @returns
 */
export function getAccessDeniedProgs(roleKey: RoleKeyMgmt, roleVal: RoleVal): string[] {
  return menuEnv.accessDenied[roleKey][roleVal].progs ?? [];
}
