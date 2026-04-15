export const frameworkEnv = {
  name: 'suinwmgmt',
  title: import.meta.env.VITE_TITLE,
  defaultTheme: 'pink',
  defaultLightLogo: import.meta.env.BASE_URL + '/images/default_logo_light.png',
  defaultDarkLogo: import.meta.env.BASE_URL + '/images/default_logo_dark.png',
  defaultDevIcon: import.meta.env.BASE_URL + 'images/icon/component__line.svg',
};

export const requestEnv = {
  baseURL: '/scpnwmgmt',
  timeout: 60 * 1000, // 60sec
  useAxiosConsoleLog: true,
  meta: {
    useToken: true,
    useRefresh: true,
    useNotification: true,
    useLoader: true,
    responseAll: false,
  },
};

export const layoutEnv = {
  breakpoint: 1280,
};

export const inputsEnv = {
  inputFormats: {
    text: /[^a-zA-Zㄱ-ㅎ가-힣]/g,
    textSpace: /[^a-zA-Zㄱ-ㅎ가-힣\s]/g,
    textNumberDash: /[^0-9ㄱ-ㅎ가-힣a-zA-Z_-]/g,
    textNumberDashSpace: /[^0-9ㄱ-ㅎ가-힣a-zA-Z_-\s]/g,
    eng: /[^a-zA-Z]/g,
    engSpace: /[^a-zA-Z\s]/g,
    engNumber: /[^0-9a-zA-Z]/g,
    ko: /[^ㄱ-ㅎ가-힣]/g,
    koSpace: /[^ㄱ-ㅎ가-힣\s]/g,
    number: /[^0-9]/g,
    email: /[^a-zA-Z0-9@\.]/g,
    tel: /[^0-9\-]/g,
    amount: /[^0-9,]/g,
    password: /[^0-9a-zA-Z!@#$%_+]/g,
    color: /[^#0-9a-fA-F]/g,
  },
  validationFormats: {
    text: /^[ㄱ-ㅎ|가-힣|a-z|A-Z|]+$/,
    textSpace: /^[ㄱ-ㅎ|가-힣|a-z|A-Z| ]+$/,
    textNumberDash: /^[ㄱ-ㅎ|가-힣|0-9|a-z|A-Z|_|-]+$/,
    textNumberDashSpace: /^[ㄱ-ㅎ|가-힣|0-9|a-z|A-Z|_| |-]+$/,
    eng: /^[A-Za-z]+$/,
    engSpace: /^[A-Za-z| ]+$/,
    engNumber: /^[0-9|a-z|A-Z]+$/,
    ko: /^[ㄱ-ㅎ|가-힣]+$/,
    koSpace: /^[ㄱ-ㅎ|가-힣| ]+$/,
    number: /^[0-9]+$/,
    email: /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,5}$/,
    tel: /^(02|0(0|1|3|4|5|6|7|8|9|0)\d{1})-?\d{3,4}-?\d{4}$/,
    phone: /^01([0|1|6|7|8|9])-?\d{3,4}-?\d{4}$/,
    url: /^[0-9|a-z|A-Z|:\/#\.]+$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}/,
  },
} as {
  inputFormats: Record<string, RegExp>;
  validationFormats: Record<string, RegExp>;
};

export const regxsEnv = {
  userNameInput: /[^0-9ㄱ-ㅎ가-힣a-zA-Z]/g,
  pwd: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}|(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{10,}|(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,}|(?=.*[A-Za-z])(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,}$/,
  textNumberDashPlus: /^[ㄱ-ㅎ|가-힣|0-9|a-z|A-Z|_|\-|+]+$/,
  textNumberDashPlusInput: /[^ㄱ-ㅎ가-힣0-9a-zA-Z_\-\+]/g,
  phone: /^\d{10,}$/,
  lnglat: /^[0-9|\.]+$/,
  lat: /^[-+]?([0-8]?\d|90)\.?\d*$/,
  lng: /^[-+]?([01]?\d{1,2}|180)\.?\d*$/,
  lnglatInput: /[^0-9.]/g,
  searchTextInput: /[^0-9ㄱ-ㅎ가-힣a-zA-Z!@%^\-_=+{}|;:,./? ]/g,
  textNumberSpecial: /^[ㄱ-ㅎ|가-힣|0-9|a-z|A-Z|_| |-|[|\]|.|/|:]+$/,
  textNumberSpecialInput: /[^0-9ㄱ-ㅎ가-힣a-zA-Z_\-[\].: ]/g,
  prettyPhone: /^01([0|1|6|7|8|9])-\d{4}-\d{4}$/,
  color: /^#([0-9a-fA-F]{3}){1,2}$/i,
  positiveNumberInput: /^0+$|[^0-9]/g,
};

export const locationMapEnv = {
  defaultCenter: { lat: 37.53006, lng: 126.9918 },
  defaultZoom: 12,
  minZoom: 8,
  maxZoom: 18,
};

export const googleMapEnv = {
  apiKey: 'QUl6YVN5Q1FwcFdiNlF2eU11eEVRRF90a2kteXdvSDJwZDhMN09N',
  mapId: 'DEMO_MAP_ID',
};

export const reloadDelayTime = 1500;

export const menuEnv = {
  accessDenied: {
    LGU: {
      ADMIN: {
        menus: [],
        progs: [],
      },
      USER: {
        menus: [
          '21021', // 약관 관리
          '21025', // 기지국 관리
          '21026', // 단말 정보 배치 작업 이력
          '21028', // 요금제 관리
        ],
        progs: ['/board/notice/edit', '/board/faq/edit', '/terms/detail', '/terms/edit'],
      },
    },
    DEAL: {
      ADMIN: {
        menus: [
          '21025', // 기지국 관리
          '21026', // 단말 정보 배치 작업 이력
        ],
        progs: ['/terms/detail', '/terms/edit'],
      },
      USER: {
        menus: [
          '21021', // 약관 관리
          '21024', // 제휴사 관리
          '21025', // 기지국 관리
          '21026', // 단말 정보 배치 작업 이력
          '21028', // 요금제 관리
        ],
        progs: ['/board/notice/edit', '/board/faq/edit', '/terms/detail', '/terms/edit'],
      },
    },
  },
};
