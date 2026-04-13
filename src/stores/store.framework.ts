import { defineStore } from 'pinia';

type FramworkState = {
  loadingQueue: string[];
  displayedLoadingQueue: string[];
};

const LOADING_PUSH_DELAY_TIME = 150;
const LOADING_POP_DELAY_TIME = 50;

export const useFrameworkStore = defineStore('framework', {
  state: () => {
    return {
      loadingQueue: [],
      displayedLoadingQueue: [],
    } as FramworkState;
  },
  getters: {
    showLoading: (state: FramworkState) => {
      return state.displayedLoadingQueue.length > 0;
    },
  },
  actions: {
    pushLoading(key: string) {
      setTimeout(() => {
        if (this.loadingQueue.includes(key)) {
          this.displayedLoadingQueue.push(key);
        }
      }, LOADING_PUSH_DELAY_TIME);

      this.loadingQueue.push(key);
    },
    popLoading(key: string) {
      setTimeout(() => {
        const index = this.loadingQueue.indexOf(key);
        if (index > -1) {
          this.loadingQueue.splice(index, 1);
        }

        const displayedIndex = this.displayedLoadingQueue.indexOf(key);
        if (displayedIndex > -1) {
          this.displayedLoadingQueue.splice(displayedIndex, 1);
        }
      }, LOADING_POP_DELAY_TIME);
    },
    clearLoading() {
      this.loadingQueue = [];

      setTimeout(() => {
        this.displayedLoadingQueue = [];
      }, LOADING_POP_DELAY_TIME);
    },
  },
});
