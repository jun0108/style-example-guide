import { getAccessDeniedMenus, getAccessDeniedProgs } from '@/utils/roleUtils';

export const useMenuStore = defineStore('menu', {
  state: () => {
    return {
      menuList: [],
      progList: [],
    } as {
      menuList: AuthMenu[];
      progList: AuthProg[];
    };
  },
  getters: {
    firstLevelMenus(state) {
      return state.menuList
        .filter((_m) => _m.menuLevel === '1')
        .sort((a, b) => parseInt(a.menuOrder) - parseInt(b.menuOrder));
    },
    getChildren(state) {
      return (custMenuSeq: string) =>
        state.menuList
          .filter((_m) => _m.upCustMenuSeq === custMenuSeq)
          .sort((a, b) => parseInt(a.menuOrder) - parseInt(b.menuOrder));
    },
    isAccessDeniedMenu(state) {
      return (roleKey: RoleKeyMgmt, roleVal: RoleVal, path: string) => {
        const menuSeq = state.menuList.find((_m) => _m.progUri === path)?.menuSeq;
        return !menuSeq || getAccessDeniedMenus(roleKey, roleVal).includes(menuSeq);
      };
    },
    isAccessDeniedProg(state) {
      return (roleKey: RoleKeyMgmt, roleVal: RoleVal, path: string) => {
        const progUri = state.progList.find((_m) => _m.progUri === path)?.progUri;
        return !progUri || getAccessDeniedProgs(roleKey, roleVal).includes(path);
      };
    },
  },
  actions: {
    patchMenuList(menuList: AuthMenu[]) {
      this.menuList = menuList;
    },
    patchProgList(progList: AuthProg[]) {
      this.progList = progList;
    },
  },
});
