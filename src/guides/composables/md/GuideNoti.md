# 토스트 알림

- `useNoti`를 이용하여 토스트 알림 호출 할 수 있다.
- Promise 기반

## API Reference

#### show

```
show(message: string, options: DialogOptions) => Promise<void>
```

#### success

```
success(message: string, options: DialogOptions) => Promise<void>
```

#### warning

```
warning(message: string, options: DialogOptions) => Promise<void>
```

#### error

```
error(message: string, options: DialogOptions) => Promise<void>
```

| 파라미터 | 타입        | 기본값 | 필수 | 설명             |
| -------- | ----------- | ------ | ---- | ---------------- |
| message  | string      |        | 필수 | 알림 메시지      |
| options  | NotiOptions |        |      | 토스트 알림 옵션 |

## Types

#### NotiOptions

```ts
type NotiOptions = {
  useClose?: boolean;
  time?: number;
};
```

| 옵션     | 타입   | 기본값 | 설명                            |
| -------- | ------ | ------ | ------------------------------- |
| useClose | string |        | `App.vue` 에서 글로벌 설정 가능 |
| time     | string | 3000   | `App.vue` 에서 글로벌 설정 가능 |

## GlobalOptions

`App.vue`에서 설정 가능

| 옵션     | 타입                                                                                            | 기본값      | 설명                  |
| -------- | ----------------------------------------------------------------------------------------------- | ----------- | --------------------- |
| useClose | string                                                                                          |             | 닫기 사용 여부        |
| time     | string                                                                                          | 3000        | 토스트 알림 노출 시간 |
| position | 'top-left' \| 'top-center' \| 'top-right' \| 'bottom-left' \| 'bottom-center' \| 'bottom-right' | 'top-right' | 토스트 알림 출력 위치 |

## Usage

```vue
<script>
// 페이지 상단 선언
const noti = useNoti();
</script>
```

### show

일반 타입 토스트 알림 출력

```vue
<script>
const noti = useNoti();

function showNoti() {
  noti.show('환영합니다');
}
</script>
```

### success

성공 타입 토스트 알림 출력

```vue
<script>
const noti = useNoti();

function showSuccessNoti() {
  noti.success('저장되었습니다');
}
</script>
```

### warning

경고 타입 토스트 알림 출력

```vue
<script>
const noti = useNoti();

function showWarningNoti() {
  noti.warning('입력 항목을 확인해 주세요');
}
</script>
```

### error

오류 타입 토스트 알림 출력

```vue
<script>
const noti = useNoti();

function showErrorNoti() {
  noti.error('서버 오류가 발생했습니다 다시 시도해 주세요');
}
</script>
```

### 글로벌로 알림 위치 설정

`App.vue` 에서 설정

```vue
<template>
  <NotiContainer position="bottom-center" />
</template>
```
