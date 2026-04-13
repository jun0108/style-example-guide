import { frameworkEnv } from '@/envs';
// import { setCustomTheme } from '@/utils/themeUtil';

// FIXME :: 프론트 확인 필요
import { clearCustomTheme, setCustomTheme } from '@/utils/themeUtil';

type AuthCustReq = {
  custWebUrl: string;
};

export const useCustStore = defineStore('cust', {
  state: () => {
    return {
      custSeq: undefined,
      custLoginId: undefined,
      custNm: undefined,
      custTypeCdId: undefined,
      custTypeCdKey: undefined,
      custTelNo: undefined,
      custRegNo: undefined,
      custWebUrl: undefined,
      custSiteNm: undefined,
      sendTelNo: undefined,
      nmsYn: undefined,
      colorLogoFile: undefined,
      whiteLogoFile: undefined,
      themeColor: undefined,
      screenModCd: undefined,
    } as Partial<AuthCust>;
  },
  getters: {
    isUplus(state) {
      return state.custTypeCdKey === 'LGU';
    },
    isDeal(state) {
      return state.custTypeCdKey === 'DEAL';
    },
    isLightTheme(state) {
      return state.screenModCd === 'light';
    },
    logoUrl(state) {
      return state.screenModCd === 'light' ? state.colorLogoFile : state.whiteLogoFile;
    },
  },
  actions: {
    async patchCustWebUrl(custWebUrl: string) {
      this.custWebUrl = custWebUrl;
    },
    async setCust(custWebUrl: string) {
      if (!this.custWebUrl) {
        this.custWebUrl = custWebUrl;
      }

      if (this.custSeq) {
        return Promise.resolve(this);
      }

      try {
        const resposne = await request.post<RequestResponse<AuthCust>, AuthCustReq>({
          url: '/cust/getCustThemeByCustWebUrl',
          xMid: 'P10000',
          data: {
            custWebUrl: this.custWebUrl,
          },
        });

        if (!resposne.data) {
          throw 'No Cust';
        }

        const cust = resposne.data;

        this.custSeq = cust.custSeq;
        this.custLoginId = cust.custLoginId;
        this.custNm = cust.custNm;
        this.custTypeCdId = cust.custTypeCdId;
        this.custTypeCdKey = cust.custTypeCdKey;
        this.custTelNo = cust.custTelNo;
        this.custRegNo = cust.custRegNo;
        this.custWebUrl = cust.custWebUrl;
        this.custSiteNm = cust.custSiteNm;
        this.sendTelNo = cust.sendTelNo;
        this.nmsYn = cust.nmsYn;
        this.colorLogoFile = cust.colorLogoFile;
        this.whiteLogoFile = cust.whiteLogoFile;
        this.themeColor = cust.themeColor;
        this.screenModCd = cust.screenModCd;

        //  // 고객사 화면모드(light / dark) 적용
        //  if (this.screenModCd) {
        //   document.body.classList.add(this.screenModCd);
        // }

        // FIXME :: 프론트 확인 필요
        const root = document.documentElement;
        const themeMode = this.screenModCd === 'dark' ? 'dark' : 'light';
        root.setAttribute('data-theme', themeMode);

        // 고객사 테마 적용
        if (this.themeColor?.startsWith('#')) {
          //  // TODO: 테마 관련 퍼블 가이드 적용 필요
          //  document.body.classList.add('custom');
          //  const selector = this.screenModCd === 'dark' ? ':root .dark.custom' : ':root .custom';
          //  setCustomTheme(selector, this.themeColor);

          // FIXME :: 프론트 확인 필요
          root.setAttribute('data-brand', 'custom');
          setCustomTheme(':root', this.themeColor);
        } else {
          // document.body.classList.add(this.themeColor || frameworkEnv.defaultTheme);
          // FIXME :: 프론트 확인 필요
          clearCustomTheme(':root');
          root.setAttribute('data-brand', this.themeColor || frameworkEnv.defaultTheme);
        }

        return Promise.resolve(this);
      } catch (e) {
        console.error(e);
        return Promise.reject(e);
      }
    },
  },
});
