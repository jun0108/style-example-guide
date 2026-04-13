export type ModalGlobalOptions = {
  minHeight?: string;
  maxHeight?: string;
  minWidth?: string;
  maxWidth?: string;
  useHeader?: boolean;
  useOutsideClick?: boolean;
  isFull?: boolean;
};

export type ModalOptions = ModalGlobalOptions & {
  width?: string;
  height?: string;
  title?: string;
};

export type Modal = {
  component: any;
  options?: ModalOptions;
  bind?: Record<string, any>;
  on?: Record<string, Function>;
};

export type ModalInstanceOptions = Modal & {
  id: string;
};

export type ModalContainerApi = {
  create: (modal: Modal) => void;
  remove: (id: string) => void;
};

export type ModalApi = {
  open: (modal: Modal) => void;
  close: (id: string) => void;
  closeAll: () => void;
};
