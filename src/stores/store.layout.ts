type LayoutType = 'mobile' | 'pc';
type LayoutState = {
  type: LayoutType;
};

export const useLayoutStore = defineStore('layout', {
  state: () => {
    return {
      type: 'pc',
    } as LayoutState;
  },
  getters: {
    isMobile: (state: LayoutState) => {
      return state.type === 'mobile';
    },
    isPc: (state: LayoutState) => {
      return state.type === 'pc';
    },
  },
  actions: {
    setLayoutType(type: LayoutType) {
      this.type = type;
    },
  },
});
