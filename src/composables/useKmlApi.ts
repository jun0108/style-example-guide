// kml 파일 조회
async function fetchKmlFile(path: string) {
  try {
    const response = await request.post({
      url: '/com/file/download' + path,
      xMid: 'P20000',
      config: {
        responseType: 'text',
      },
    });

    return Promise.resolve(response);
  } catch (e) {
    console.error('Kml fetch error', e);
  }
}

export function useKmlApi() {
  return {
    fetchKmlFile,
  };
}
