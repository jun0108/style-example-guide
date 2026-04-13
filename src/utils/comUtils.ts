import dayjs from 'dayjs';

/**
 * 랜덤 키 발행
 * @returns string
 */
export function getRandomKey(): string {
  return (Math.random() + 1).toString(32).substring(7);
}

/**
 * 빈 값 여부 확인
 * @param value any
 * @returns boolean
 */
export function isEmpty(value: any): boolean {
  const result = false;
  if (value === undefined) {
    return true;
  }
  if (typeof value === 'number') {
    if (value === 0 || !value) {
      return true;
    }
  } else if (typeof value === 'string') {
    if (value === '' || value.length === 0) {
      return true;
    }
  } else if (typeof value === 'object') {
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return true;
      }
    } else if (!value) {
      return true;
    } else if (Object.keys(value).length === 0) {
      return true;
    }
  }
  return result;
}

/**
 * 전화번호 포맷
 * @param value
 * @returns
 */
export function prettyPhoneNo(value: string) {
  return value.replace(/[^0-9]/g, '').replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
}

/**
 * 빈 값 포맷
 * @param value
 * @returns
 */
export function prettyEmpty(value?: string) {
  return isEmpty(value) ? '-' : value;
}

/**
 * 사업자 등록 번호 포맷
 * @param value
 * @returns
 */
export function prettyRegNo(value: string) {
  return value.replace(/^(\d{2})(\d{3})(\d{5})$/, `$1-$2-$3`);
}

/**
 * 휴대폰 뒷번호 4자리 가져오기
 * @param value
 * @returns
 */
export function getLast4PhoneNo(phone: string) {
  if (!phone) return '';
  const cleaned = phone.replace(/[^0-9]/g, '');
  return cleaned.slice(-4);
}

/**
 * 파일 유효성 검사
 * @param file - 검사항 파일 객체
 * @param extensions - 허용할 확장자 목록 / 미선언 시 확장자 검사 생략
 * @param maxSize - 최대 파일 크기 (기본 단위:MB) / 미선언 시 크기 검사 생략
 * @returns
 */
export function validateFile(file: File, extensions?: string[], maxSize?: number): FileValidationRes {
  if (extensions) {
    const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
    if (!extensions.includes(ext)) {
      return { valid: false, error: 'INVALID_EXTENSION' };
    }
  }

  if (maxSize && file.size > maxSize * 1024 * 1024) {
    return { valid: false, error: 'EXCEEDED_SIZE' };
  }

  return { valid: true };
}

/**
 * 숫자 자리수 표시
 * @param value
 * @returns
 */
export function prettyNumber(value: number | string = 0) {
  const val = String(value).split('.');
  const result = [val[0]!.replace(/\B(?=(\d{3})+(?!\d))/g, ',')];
  if (val[1]) {
    result.push(val[1]);
  }
  return result.join('.');
}

/**
 * 날짜 연월 포맷
 * @param value
 * @returns
 */
export function prettyYyyymm(value: string) {
  return value.replace(/[^0-9]/g, '').replace(/^(\d{4})(\d{2})$/, `$1-$2`);
}

/**
 * 기본 조회 기간 (현재 기준 -3개월)
 * @returns string[]
 */
export function getDefaultSearchDate(): string[] {
  return [dayjs().subtract(3, 'month').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')];
}
