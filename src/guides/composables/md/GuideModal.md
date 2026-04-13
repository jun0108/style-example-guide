# 모달 팝업

- `useModal`을 이용하여 모달팝업을 호출 할 수 있다.

## API Reference

#### open

`open(options: Modal) => void`

| 파라미터 | 타입   | 기본값 | 필수 | 설명        |
| -------- | ------ | ------ | ---- | ----------- |
| message  | string |        | 필수 | 알림 메시지 |
| options  | Modal  |        |      | 모달 옵션   |

#### confirm

`confirm(message: string, options: DialogOptions) => Promise<void>`

| 파라미터 | 타입          | 기본값 | 필수 | 설명            |
| -------- | ------------- | ------ | ---- | --------------- |
| message  | string        |        | 필수 | 확인 메시지     |
| options  | DialogOptions |        |      | 다이얼로그 옵션 |

## Types

#### Modal

```ts
type Modal = {
  component: any;
  options?: ModalOptions;
  bind?: Record<string, any>;
  on?: Record<string, Function>;
};
```

| 옵션      | 타입                     | 기본값 | 설명                               |
| --------- | ------------------------ | ------ | ---------------------------------- |
| component | Component                |        | 필수                               |
| options   | ModalOptions             | {}     | 모달 옵션                          |
| bind      | Record<string, string>   | {}     | 모달 팝업에 바인딩 데이터          |
| on        | Record<string, Function> | {}     | 모달 팝업에서 발생한 이벤트 핸들러 |

#### ModalOptions

```ts
type ModalOptions = {
  minHeight?: string;
  maxHeight?: string;
  minWidth?: string;
  maxWidth?: string;
  width?: string;
  height?: string;
};
```

| 옵션      | 타입                                   | 기본값 | 설명 |
| --------- | -------------------------------------- | ------ | ---- |
| minHeight | string                                 |        |      |
| maxHeight | string                                 |        |      |
| minWidth  | string                                 |        |      |
| maxWidth  | string                                 |        |      |
| width     | 'sm' \| 'md' \| 'lg' \| 'xl' \| string |        |      |
| height    | string                                 |        |      |

**width** 값은 각각 아래와 같이 기본 설정됨

- sm: 'var(--modal-width-sm)'
- md: 'var(--modal-width-md)'
- lg: 'var(--modal-width-lg)'
- xl: 'var(--modal-width-xl)'

## Usage

### 기본 사용

```vue
<script>
// 페이지 상단 선언
const modal = useModal();

function openModal() {
  modal.open({
    component: () => import('@/guides/composables/components/SampleModal.vue'),
    options: {},
    bind: {},
    on: {},
  });
}
</script>
```

### 너비 지정

```vue
<script>
const modal = useModal();

function openModal() {
  modal.open({
    component: () => import('@/guides/composables/components/SampleModal.vue'),
    options: {
      width: 'sm',
    },
    bind: {},
    on: {},
  });
}
</script>
```

### 변수 바인딩

```vue
<script>
// 페이지 상단 선언
const modal = useModal();

function openModal() {
  modal.open({
    component: () => import('@/guides/composables/components/SampleModal.vue'),
    options: {},
    bind: {
      bindKey: '부모에서 모달로 넘기는 값',
    },
    on: {},
  });
}
</script>
```

### 모달 이벤트 핸들링

```vue
<script>
// 페이지 상단 선언
const modal = useModal();

function openModal() {
  modal.open({
    component: () => import('@/guides/composables/components/SampleModal.vue'),
    options: {},
    bind: {},
    on: {
      apply: (returnValue: string) => {  // 간단한 함수는 inline으로 사용
        console.log(returnValue);
      },
      save: handleSave,  // 다른 함수를 매핑 할 수 있음
    },
  });
}

function handleSave(value: string) {
  // 처리
}
</script>
```
