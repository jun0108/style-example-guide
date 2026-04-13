import type { DialogOptions } from './type.dialog';

function alert(message: string, options: DialogOptions = {}) {
  return new Promise((resolve) => {
    if (!window.$dialog) {
      console.error('Not define window.$dialog');
      return;
    }
    window.$dialog.create('alert', message, options, resolve);
  });
}

function confirm(message: string, options: DialogOptions = {}) {
  return new Promise((resolve, reject) => {
    if (!window.$dialog) {
      console.error('Not define window.$dialog');
      return;
    }
    window.$dialog.create('confirm', message, options, resolve, reject);
  });
}

function removeAll() {
  if (!window.$dialog) {
    console.error('Not define window.$dialog');
    return;
  }
  window.$dialog.removeAll();
}

export default function useDialog() {
  return {
    alert,
    confirm,
    removeAll,
  };
}
