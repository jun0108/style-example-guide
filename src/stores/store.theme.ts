const GUIDE_THEME_KEY = 'guide-theme';

function applyToDocument(isDark: boolean) {
  if (typeof document === 'undefined') return;
  if (isDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
}

function getStored(): boolean {
  if (typeof localStorage === 'undefined') return false;
  const v = localStorage.getItem(GUIDE_THEME_KEY);
  return v === 'dark';
}

function setStored(isDark: boolean) {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(GUIDE_THEME_KEY, isDark ? 'dark' : 'light');
}

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDark: getStored(),
  }),
  actions: {
    init() {
      applyToDocument(this.isDark);
    },
    setDark(isDark: boolean) {
      this.isDark = isDark;
      applyToDocument(isDark);
      setStored(isDark);
    },
    toggle() {
      this.setDark(!this.isDark);
    },
  },
});
