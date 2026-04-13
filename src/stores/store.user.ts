import type { AuthUser } from '@/types/service/type.auth';
import { isEmpty } from '@/utils/comUtils';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      usrSeq: '',
      custSeq: '',
      custWebUrl: '',
      usrLoginId: '',
      usrNm: '',
      roleCdId: '',
      roleCdNm: '',
      roleCdKey: '',
      roleCdVal: '',
      usrPhoneNo: '',
    } as AuthUser;
  },
  getters: {
    existUserData(state) {
      return !isEmpty(state.usrSeq);
    },
    user(state) {
      return {
        usrSeq: state.usrSeq,
        custSeq: state.custSeq,
        custWebUrl: state.custWebUrl,
        usrLoginId: state.usrLoginId,
        usrNm: state.usrNm,
        roleCdId: state.roleCdId,
        roleCdNm: state.roleCdNm,
        roleCdKey: state.roleCdKey,
        roleCdVal: state.roleCdVal,
        usrPhoneNo: state.usrPhoneNo,
      };
    },
    isAdmin(state) {
      return state.roleCdVal === 'ADMIN';
    },
    isUser(state) {
      return state.roleCdVal === 'USER';
    },
  },
  actions: {
    patchUser(user: AuthUser) {
      this.usrSeq = user.usrSeq;
      this.custSeq = user.custSeq;
      this.custWebUrl = user.custWebUrl;
      this.usrLoginId = user.usrLoginId;
      this.usrNm = user.usrNm;
      this.roleCdId = user.roleCdId;
      this.roleCdNm = user.roleCdNm;
      this.roleCdKey = user.roleCdKey;
      this.roleCdVal = user.roleCdVal;
      this.usrPhoneNo = user.usrPhoneNo;
    },
    clearUser() {
      this.usrSeq = '';
      this.custSeq = '';
      this.custWebUrl = '';
      this.usrLoginId = '';
      this.usrNm = '';
      this.roleCdId = '';
      this.roleCdNm = '';
      this.roleCdKey = '';
      this.roleCdVal = '';
      this.usrPhoneNo = '';

      removeToken();
      removeRefreshToken();
      removeCustUrl();
    },
    logout() {
      this.clearUser();
      setTimeout(() => {
        document.location.href = import.meta.env.BASE_URL + '/login/fail';
      }, 500);
    },
  },
});
