export type DialogType = 'confirm' | 'alert';
export type DialogActionType = 'cancel' | 'confirm';
export type DialogGlobalOptions = {
  useHeader?: boolean;
  cancelButtonVariant?: string;
  confirmButtonVariant?: string;
  cancelButtonText?: string;
  confirmButtonText?: string;
  clickToClose?: boolean;
  confirmTitle?: string;
  alertTitle?: string;
  additionalClass?: string;
};

export type DialogOptions = DialogGlobalOptions & {
  title?: string;
  additionalMsg?: string;
};

export type DialogInstanceOptions = DialogOptions & {
  type: DialogType;
  id: string;
  message: string;
  resolve: (value: void | PromiseLike<void>) => void;
  reject?: (value: void | PromiseLike<void>) => void;
  confirmTitle: string;
  alertTitle: string;
};

export type DialogContainerApi = {
  create: (
    type: DialogType,
    message: string,
    options: DialogOptions,
    resolve: (value: void | PromiseLike<void>) => void,
    reject?: (value: void | PromiseLike<void>) => void,
  ) => void;
  remove: (id: string) => void;
  removeAll: () => void;
};

export type DialogApi = {
  alert: (msg: string, options: DialogOptions) => Promise<any>;
  confirm: (msg: string, options: DialogOptions) => Promise<any>;
};
