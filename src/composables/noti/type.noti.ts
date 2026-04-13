export type NotiType = 'default' | 'success' | 'warning' | 'error';

export type NotiPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

export type NotiCommonOptions = {
  useClose?: boolean;
  time?: number;
};

export type NotiGlobalOptions = NotiCommonOptions & {
  position?: NotiPosition;
};

export type NotiOptions = NotiCommonOptions & {};

export type NotiInstanceOptions = NotiOptions & {
  type: NotiType;
  id: string;
  message: string;
};

export type NotiContainerApi = {
  create: (type: NotiType, message: string, options: NotiOptions) => void;
  remove: (id: string) => void;
};

export type NotiApi = {
  show: (message: string, options?: NotiOptions) => void;
  success: (message: string, options?: NotiOptions) => void;
  warning: (message: string, options?: NotiOptions) => void;
  error: (message: string, options?: NotiOptions) => void;
};
