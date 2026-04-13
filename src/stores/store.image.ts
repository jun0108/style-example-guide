type ImageStoreState = {
  images: Record<string, string>;
};

export const useImageStroe = defineStore('image', {
  state: () => {
    return {
      images: {},
    } as ImageStoreState;
  },
  actions: {
    async fetchImage(key: string) {
      if (this.images[key]) {
        return Promise.resolve(this.images[key]);
      }

      try {
        const image = useImage();
        if (key.startsWith('/icons')) {
          // 웹서버 파일
          const url = key.startsWith(import.meta.env.BASE_URL) ? key : import.meta.env.BASE_URL + key;
          this.images[key] = await image.fetchWebImageAsDataUrl(url);
          return Promise.resolve(this.images[key]);
        } else {
          // 고객사 등록 파일
          this.images[key] = await image.fetchImageAsDataUrl(key);
          return Promise.resolve(this.images[key]);
        }
      } catch (e) {
        return Promise.reject(e);
      }
    },
  },
});
