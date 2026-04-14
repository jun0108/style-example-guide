// 공개 이미지
async function fetchPublicImageAsUrl(path: string) {
  try {
    const response = await request.get({
      url: '/com/file/public/image' + path,
      xMid: 'P20000',
      config: {
        responseType: 'blob',
      },
    });
    return URL.createObjectURL(response);
  } catch (e) {
    console.error('Image fetch error', e);
    throw e;
  }
}

// 비공개 이미지
async function fetchImageAsUrl(path: string) {
  try {
    const response = await request.get({
      url: '/com/file/image' + path,
      xMid: 'P20000',
      config: {
        responseType: 'blob',
        meta: {
          useRefresh: false,
        },
      },
    });
    return URL.createObjectURL(response);
  } catch (e) {
    console.error('Image fetch error', e);
    throw e;
  }
}

// 이미지 url 해제
function releaseImageUrl(url: string) {
  if (url && url.startsWith('blob:')) {
    URL.revokeObjectURL(url);
  }
}

// 이미지 DataUrl로 호출 (웹서버 이미지 조회 시 사용)
async function fetchWebImageAsDataUrl(path: string): Promise<string> {
  try {
    const blob = await fetch(path).then((r) => r.blob());

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
}

// 비공개 이미지를 DataUrl로
async function fetchImageAsDataUrl(path: string): Promise<string> {
  try {
    const blob = await request.get({
      url: '/com/file/image' + path,
      xMid: 'P20000',
      config: {
        responseType: 'blob',
        meta: {
          useRefresh: false,
        },
      },
    });

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (e) {
    console.error('Image fetch error', e);
    return Promise.reject(e);
  }
}

export function useImage() {
  return {
    fetchPublicImageAsUrl,
    fetchImageAsUrl,
    releaseImageUrl,
    fetchWebImageAsDataUrl,
    fetchImageAsDataUrl,
  };
}
