import type { NotiOptions } from './type.noti';

function show(message: string, options: NotiOptions = {}) {
  if (!window.$noti) {
    console.error('Not define windwo.$noti');
    return;
  }

  window.$noti.show(message, options);
}

function success(message: string, options: NotiOptions = {}) {
  if (!window.$noti) {
    console.error('Not define windwo.$noti');
    return;
  }

  window.$noti.success(message, options);
}

function warning(message: string, options: NotiOptions = {}) {
  if (!window.$noti) {
    console.error('Not define windwo.$noti');
    return;
  }

  window.$noti.warning(message, options);
}

function error(message: string, options: NotiOptions = {}) {
  if (!window.$noti) {
    console.error('Not define windwo.$noti');
    return;
  }

  window.$noti.error(message, options);
}

export default function useNoti() {
  return {
    show,
    success,
    warning,
    error,
  };
}
