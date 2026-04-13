import { useMenuStore } from './store.menu';
import { useUserStore } from './store.user';

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {};
  },
  actions: {
    async setAuthUserMenu() {
      const userStore = useUserStore();
      const menuStore = useMenuStore();

      if (userStore.existUserData) {
        return Promise.resolve();
      }
      try {
        const response = await request.post<RequestResponse<AuthUser>>({
          url: '/auth/getAuthUserMenu',
          xMid: 'P10000',
          data: {},
        });
        userStore.patchUser(response.data!);
        menuStore.patchMenuList(response.data!.menuList ?? []);
        menuStore.patchProgList(response.data!.progList ?? []);

        return Promise.resolve();
      } catch (e) {
        return Promise.reject();
      }
    },
    async resetAuthUserMenu() {
      const userStore = useUserStore();
      userStore.$patch({
        usrSeq: undefined,
      });
      return this.setAuthUserMenu();
    },
  },
});
