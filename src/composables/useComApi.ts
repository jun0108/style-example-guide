// 공통 코드 조회
async function getCodeList(parentCdId: string, xMid: string, params: CodeParameters = {}): Promise<Code[]> {
  try {
    const response = await request.post<RequestResponse<Code[]>, CodeParameters>({
      url: '/com/code/getCodeList',
      xMid,
      data: {
        parentCdId,
        ...params,
      },
    });
    return Promise.resolve(response.data || []);
  } catch (e) {
    return Promise.reject(e);
  }
}

// 대리점 목록 조회
async function getDealershipList(xMid: string): Promise<ComCust[]> {
  try {
    const response = await request.post<RequestResponse<ComCust[]>>({
      url: '/cust/getDealershipList',
      xMid,
      data: {},
    });
    return Promise.resolve(response.data || []);
  } catch (e) {
    return Promise.reject(e);
  }
}

// 고객사 목록 조회
async function getCustomerList(xMid: string): Promise<ComCust[]> {
  try {
    const response = await request.post<RequestResponse<ComCust[]>>({
      url: '/cust/getCustomerList',
      xMid,
      data: {},
    });
    return Promise.resolve(response.data || []);
  } catch (e) {
    return Promise.reject(e);
  }
}

// 제조사 목록 조회
async function getManufacturerList(xMid: string): Promise<ComCust[]> {
  try {
    const response = await request.post<RequestResponse<ComCust[]>>({
      url: '/cust/getManufacturerList',
      xMid,
      data: {},
    });
    return Promise.resolve(response.data || []);
  } catch (e) {
    return Promise.reject(e);
  }
}

// 고객사의 제조사 목록 조회
async function getManufacturerListByCustSeq(custSeq: string, xMid: string): Promise<ComCust[]> {
  try {
    const response = await request.post<RequestResponse<ComCust[]>, Pick<ComCust, 'custSeq'>>({
      url: '/cust/getManufacturerListByCustSeq',
      xMid,
      data: { custSeq },
    });
    return Promise.resolve(response.data || []);
  } catch (e) {
    return Promise.reject(e);
  }
}

// 고객사의 단말 목록 조회
async function getDevMdlListByCustSeq(custSeq: string, xMid: string): Promise<ComDevMdl[]> {
  try {
    const response = await request.post<RequestResponse<ComDevMdl[]>, ComDevMdlParameters>({
      url: '/cust/getDevMdlListByCustSeq',
      xMid,
      data: { custSeq },
    });
    return Promise.resolve(response.data || []);
  } catch (e) {
    return Promise.reject(e);
  }
}

// 단말 속성 정보 조회
async function getDevMdlAttbList(xMid: string): Promise<ComDevMdlAttb[]> {
  try {
    const response = await request.post<RequestResponse<ComDevMdlAttb[]>>({
      url: '/devmdl/getDevMdlAttbList',
      xMid,
      data: {},
    });
    return Promise.resolve(response.data || []);
  } catch (e) {
    return Promise.reject(e);
  }
}

// 헤더 템플릿 목록 조회
async function getHeaderTemplateList(tmplCdId: string, xMid: string): Promise<HeaderTemplateColumn[]> {
  try {
    const response = await request.post<RequestResponse<HeaderTemplate[]>>({
      url: '/tmpl/getHeaderTemplateList',
      xMid,
      data: {
        tmplCdId,
      },
    });

    const data = response.data || [];

    const columns = data.map((_i) => {
      const colModelData = JSON.parse(_i.colModelData);
      return {
        field: colModelData.name,
        headerName: _i.colNameData,
        width: parseInt(colModelData.width) || undefined,
        type: colModelData.type || 'string',
        align: colModelData.align || 'left',
        seq: _i.tmplSeq,
      };
    });

    return Promise.resolve(columns);
  } catch (e) {
    return Promise.reject(e);
  }
}

export function useComApi() {
  return {
    getCodeList,
    getDealershipList,
    getCustomerList,
    getManufacturerList,
    getManufacturerListByCustSeq,
    getDevMdlListByCustSeq,
    getDevMdlAttbList,
    getHeaderTemplateList,
  };
}
