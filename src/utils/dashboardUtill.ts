const WIDGET_TEMPLATE_LIST = [
  { value: 'APPROVAL_REQUEST', seq: '1' },
  { value: 'DEV_STATUS', seq: '2' },
  { value: 'DEV_ON_OFF', seq: '3' },
] as {
  value: string;
  seq: string;
}[];

/**
 * 템플릿 유형 목록
 * @returns
 */
export function getWidgetTemplateList() {
  return WIDGET_TEMPLATE_LIST;
}

/**
 * 템플릿 SEQ
 * @returns
 */
export function getWidgetTemplateSeq(tmplValue: string) {
  return WIDGET_TEMPLATE_LIST.find((_i) => _i.value === tmplValue)?.seq || '';
}

/**
 * 템플릿 유형
 * @returns
 */
export function getWidgetTemplateValue(tmplSeq: string) {
  return WIDGET_TEMPLATE_LIST.find((_i) => _i.value === tmplSeq)?.value || '';
}
