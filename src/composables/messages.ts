/**
 * 공통으로 사용되는 문구들을 관리
 */

export const messages = {
  common: {
    // 팝업
    popup: {
      create: '등록하시겠습니까?',
      updateSave: '수정 사항을 저장하시겠습니까?',
      updateCancel: '수정을 취소하시겠습니까?',
      updateCancelDesc: '수정 취소 시, 변경사항은 저장되지 않습니다.',
      modifySave: '변경된 사항을 저장하시겠습니까?',
      delete: '삭제하시겠습니까?',
      deleteDesc: '삭제한 항목은 복구할 수 없습니다.',
      cancel: '취소하시겠습니까?',
      cancelDesc: '취소 시, 작성 내용은 저장되지 않습니다',
      close: '창을 닫으시겠습니까?',
      closeDesc: '작성한 내용은 저장되지 않습니다.',
      emptyResult: '검색어와 일치하는 결과가 없습니다.',
    },

    // 토스트
    toast: {
      create: '등록되었습니다.',
      save: '저장되었습니다.',
      delete: '삭제되었습니다.',
      fileUpload: '파일이 업로드 되었습니다.',
      noPage: '존재하지 않는 페이지입니다.',
      resetPw: '비밀번호가 초기화되었습니다.',
    },
  },

  // 입력
  input: {
    // 고객사/제휴사
    custNm: '고객사명을 입력해주세요.',
    custId: '고객사 ID를 입력해주세요.',
    manfNm: '제조사명을 입력해주세요.',
    manfId: '제조사 ID를 입력해주세요.',
    dealNm: '대리점명을 입력해주세요.',
    dealCd: '대리점 코드를 입력해주세요.',
    regNo: '사업자등록번호를 입력해주세요.',
    webUrl: '접속주소를 입력해주세요.',
    nmsUrl: '제조사 NMS가 있는 경우, 주소를 입력해주세요.',
    bill: '청구계정 번호를 입력해주세요.',
    siteNm: '사이트명을 입력해주세요.',
    smsNo: 'SMS 발신번호를 입력해주세요.',
    mdlNickNm: '모델 닉네임을 입력해주세요.',
    menuNickNm: '메뉴 닉네임을 입력해주세요.',
    colorCd: '컬러 코드 입력',

    // 단말 모델
    devMdlNm: '단말 모델명을 입력해주세요.',
    mdlNm: '모델명을 입력해주세요.',
    mdlCd: '모델 코드를 입력해주세요.',

    // 위치 관제
    ctn: '식별번호(CTN)을 입력해주세요.',
    entrNo: '가입번호를 입력해주세요.',
    location: '건물명을 입력해주세요.',
    road: '도로명 주소를 입력해주세요.',
    jibun: '지번 주소를 입력해주세요.',
    lat: '위도를 입력해주세요.',
    lon: '경도를 입력해주세요.',
    detailAddr: '상세주소를 입력해주세요.',

    // 사용자
    userNm: '사용자명을 입력해주세요.',
    userName: '사용자 이름을 입력해주세요.',
    userId: '사용자 ID를 입력해주세요.',
    loginIp: '로그인 IP를 입력해주세요.',
    name: '이름을 입력해주세요.',
    id: '아이디를 입력해주세요.',
    phoneNo: '휴대폰 번호를 입력해주세요.',
    sendNo: '발신자 번호를 입력해주세요.',
    phoneNoOrNm: '수신자 번호 또는 이름을 입력해주세요.',

    // 공지/FAQ/약관
    searchValue: '검색어를 입력해주세요.',
    subject: '제목을 입력해주세요.',
    noti: '공지사항을 작성해주세요.',
    faq: 'FAQ 내용을 작성해주세요.',
    terms: '약관 내용을 작성해주세요.',
    url: 'URL을 입력해주세요.',

    // 기타
    privacy: '개인 정보 표시 사유를 입력해주세요.',
    rejectReason: '반려 사유를 입력해주세요.',
    noDash: "'-'없이 입력해주세요.",
    noDashNum: "'-'없이 숫자만 입력해주세요.",
  },

  // 선택
  select: {
    cust: '고객사를 선택해주세요.',
    manf: '제조사를 선택해주세요.',
    manfNm: '제조사명을 선택해주세요.',
    deal: '대리점을 선택해주세요.',
    managementDeal: '제휴사 관리 대리점을 선택해주세요.',
    freeUseEndDttm: '만료일을 선택해주세요.',
    devMdl: '단말 모델을 선택해주세요.',
    terms: '약관을 선택해주세요.',
  },

  // 대시보드
  dashboard: {
    reset: '변경사항을 초기화 하시겠습니까?',
    editWidget: '편집 내용 저장 안내',
    editWidgetDesc: '현재 변경된 내용을 저장한 후 이동하시겠습니까?',
    deleteWidget: '선택한 위젯을 삭제하시겠습니까?',
    deleteWidgetDesc: '삭제한 위젯은 복구할 수 없습니다.',
  },
  // 사용자
  user: {
    resetPw: '비밀번호를 초기화 하시겠습니까?',
    resetPwDesc: '초기화 시 변경되는 비밀번호 :\n{사용자 아이디}+{휴대폰 번호 뒤 4자리}+!!',
    unlock: '아이디 잠김을 해제하시겠습니까?',
    unlockDesc: '해제 후 다시 잠김 상태로 바꿀 수 없습니다.',
    unlockSuccess: '아이디 잠김이 해제되었습니다.',
    wakeup: '휴면을 해제하시겠습니까?',
    wakeupDesc: '해제 후 다시 휴면 상태로 바꿀 수 없습니다.',
    wakeupSuccess: '휴면이 해제되었습니다.',
    noDelete: '본인 계정은 삭제할 수 없습니다.',
  },
  // 제휴사
  cust: {
    custDelete: '제휴사를 해지하시겠습니까?',
    custDeleteDesc: '해지한 제휴사는 복구할 수 없습니다.',
  },

  // 기타
  searchCtn: '식별번호(CTN)을 검색해주세요.',
  noData: '항목 없음',
};

export const formatMesage = (message: string, variables: string[]) => {
  return message.replace(/\{(\d+)\}/g, (_, index) => variables[index] ?? '');
};

export default messages;
