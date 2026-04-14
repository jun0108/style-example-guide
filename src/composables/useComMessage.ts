/**
 * 수정 취소 확입 팝업
 * @returns
 */
function confirmUpdateCancel() {
  return useDialog().confirm(messages.common.popup.updateCancel, {
    additionalMsg: messages.common.popup.updateCancelDesc,
    confirmButtonText: '확인',
  });
}

/**
 * 변경 사항 저장 팝업
 * @returns
 */
function confirmModifySave() {
  return useDialog().confirm(messages.common.popup.modifySave, {
    confirmButtonText: '저장',
  });
}

/**
 * 수정 저장 확인 팝업
 * @returns
 */
function confirmUpdateSave() {
  return useDialog().confirm(messages.common.popup.updateSave, {
    confirmButtonText: '저장',
  });
}

/**
 * 등록 확인 팝업
 * @returns
 */
function confirmCreate() {
  return useDialog().confirm(messages.common.popup.create, {
    confirmButtonText: '등록',
  });
}

/**
 * 삭제 확인 팝업
 * @returns
 */
function confirmDelete() {
  return useDialog().confirm(messages.common.popup.delete, {
    additionalMsg: messages.common.popup.deleteDesc,
    confirmButtonText: '삭제',
  });
}

/**
 * 취소 확인 팝업
 * @returns
 */
function confirmCancel() {
  return useDialog().confirm(messages.common.popup.cancel, {
    additionalMsg: messages.common.popup.cancelDesc,
    confirmButtonText: '확인',
  });
}

/**
 * 닫기 확인 팝업
 * @returns
 */
function confirmClose() {
  return useDialog().confirm(messages.common.popup.close, {
    additionalMsg: messages.common.popup.closeDesc,
    confirmButtonText: '닫기',
  });
}

/**
 * 검색 실패 안내 팝업
 * @returns
 */
function alertEmptyResult() {
  return useDialog().alert(messages.common.popup.emptyResult);
}

/**
 * 저장 안내 토스트
 */
function notiSave() {
  useNoti().success(messages.common.toast.save);
}

/**
 * 등록 안내 토스트
 */
function notiCreate() {
  useNoti().success(messages.common.toast.create);
}

/**
 * 삭제 안내 토스트
 */
function notiDelete() {
  useNoti().success(messages.common.toast.delete);
}

export function useComMessage() {
  return {
    confirmUpdateCancel,
    confirmModifySave,
    confirmUpdateSave,
    confirmCreate,
    confirmDelete,
    confirmCancel,
    confirmClose,
    alertEmptyResult,
    notiSave,
    notiCreate,
    notiDelete,
  };
}
