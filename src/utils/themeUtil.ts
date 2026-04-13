// 테마 컬러 설정
export function setCustomTheme(selector: string, rgb: string) {
  const el = document.querySelector(selector) as HTMLElement;
  if (!el) {
    return;
  }

  el.style.setProperty('--color-custom-primary', rgb);
}

// 테마 컬러 초기화
export function clearCustomTheme(selector: string) {
  const el = document.querySelector(selector) as HTMLElement;
  if (!el) {
    return;
  }

  el.style.removeProperty('--color-custom-primary');
}

export default {
  setCustomTheme,
  clearCustomTheme,
};
