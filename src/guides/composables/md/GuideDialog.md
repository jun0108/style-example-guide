# 다이얼로그

- `useDialog`를 이용하여 다이얼로그를 호출 할 수 있다.
- Promise 기반

## API Reference

#### alert

`alert(message: string, options: DialogOptions) => Promise<void>`

| 파라미터 | 타입          | 기본값 | 필수 | 설명            |
| -------- | ------------- | ------ | ---- | --------------- |
| message  | string        |        | 필수 | 알림 메시지     |
| options  | DialogOptions |        |      | 다이얼로그 옵션 |

#### confirm

`confirm(message: string, options: DialogOptions) => Promise<void>`

| 파라미터 | 타입          | 기본값 | 필수 | 설명            |
| -------- | ------------- | ------ | ---- | --------------- |
| message  | string        |        | 필수 | 확인 메시지     |
| options  | DialogOptions |        |      | 다이얼로그 옵션 |

## Types

#### DialogOptions

```ts
type DialogOptions = {
  cancelButtonClass?: string;
  confirmButtonClass?: string;
  cancelButtonText?: string;
  confirmButtonText?: string;
  additionalClass?: string;
  additionalMsg?: string;
};
```

| 옵션               | 타입   | 기본값 | 설명                            |
| ------------------ | ------ | ------ | ------------------------------- |
| cancelButtonClass  | string |        | `App.vue` 에서 글로벌 설정 가능 |
| confirmButtonClass | string |        | `App.vue` 에서 글로벌 설정 가능 |
| cancelButtonText   | string | 취소   | `App.vue` 에서 글로벌 설정 가능 |
| confirmButtonText  | string | 확인   | `App.vue` 에서 글로벌 설정 가능 |
| additionalClass    | string |        | 추가 설명 메시지 클래스         |
| additionalMsg      | string |        | 추가 설명 메시지                |

## Usage

```vue
<script>
// 페이지 상단 선언
const dialog = useDialog();
</script>
```

### Alert

확인 알림을 출력

```vue
<script>
const dialog = useDialog();

function alert() {
  // 알림 메시지
  dialog.alert('유효 시간이 만료되었습니다.\r\n관리자에게 문의하세요.').then(() => {
    console.log('확인 선택 시 호출');
  });
}
</script>
```

### Confirm

확인 알림 출력

```vue
<script>
const dialog = useDialog();

function alert() {
  // 확인 메시지
  dialog
    .confirm('입력된 내용을 저장하시겠습니까?')
    .then(() => {
      console.log('확인');
    })
    .catch(() => {
      console.log('취소');
    });
}
</script>
```

### 추가 설명

alert, confirm 모두 추가 설명이 필요한 경우 메시지 설정

```vue
<script>
const dialog = useDialog();

function confirmDelete() {
  dialog
    .confirm('데이터를 삭제하시겠습니까?', {
      additionalMsg: '삭제된 내용은 복구 불가능합니다.', // 추가 메시지 설정
    })
    .then(() => {
      console.log('삭제');
    })
    .catch(() => {
      console.log('취소');
    });
}
</script>
```

### 버튼 명칭 변경

alert, confirm 모두 버튼 명칭 변경 가능

```vue
<script>
const dialog = useDialog();

function confirmDelete() {
  dialog
    .confirm('데이터를 삭제하시겠습니까?', {
      cancelButtonText: '닫기', // 취소 버튼 텍스트 변경
      confirmButtonText: '삭제', // 확인 버튼 텍스트 변경
    })
    .then(() => {
      console.log('삭제');
    })
    .catch(() => {
      console.log('취소');
    });
}
</script>
```
