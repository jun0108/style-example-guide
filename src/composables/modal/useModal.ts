import type { Modal } from './type.modal';

function open(modal: Modal) {
  if (!window.$modal) {
    console.error('Not defined window.$modal');
    return;
  }

  window.$modal.open(modal);
}

function close(id: string) {
  if (!window.$modal) {
    console.error('Not defined window.$modal');
    return;
  }
  window.$modal.close(id);
}

function closeAll() {
  if (!window.$modal) {
    console.error('Not defined window.$modal');
    return;
  }
  window.$modal.closeAll();
}

export default function useMoadl() {
  return {
    open,
    close,
    closeAll,
  };
}
