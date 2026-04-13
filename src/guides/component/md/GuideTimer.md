# 타이머

## Props

| 이름  | 타입   | 기본값 | 필수 | 설명          |
| ----- | ------ | ------ | ---- | ------------- |
| limit | number | 180    |      | 제한 시간(초) |

## Emits

| 이벤트  | 타입       | 설명              |
| ------- | ---------- | ----------------- |
| expired | () => void | 제한 시간 만료 시 |

## Exposed API

| 이름  | 타입       | 설명          |
| ----- | ---------- | ------------- |
| start | () => void | 타이머 시작   |
| stop  | () => void | 타이머 중지   |
| reset | () => void | 타이머 초기화 |

## Usage

별도의 import 없이 사용한다.

### 기본 사용

```vue
<template>
  <cm-timer />
</template>
```

### 제한 시간 설정

```vue
<template>
  <cm-timer :limit="300" />
</template>
```

### 제한 시간 만료 이벤트

```vue
<script>
function handleExpired() {
  console.log('Expired time');
}
</script>
<template>
  <cm-timer :limit="300" @expired="handleExpired" />
</template>
```

### 시작

```vue
<script>
const timerRef = ref();
function start() {
  timerRef.value.start();
}
</script>
<template>
  <cm-timer ref="timerRef" />
</template>
```

### 중지

```vue
<script>
const timerRef = ref();
function stop() {
  timerRef.value.stop();
}
</script>
<template>
  <cm-timer ref="timerRef" />
</template>
```

### 초기화

```vue
<script>
const timerRef = ref();
function reset() {
  timerRef.value.reset();
}
</script>
<template>
  <cm-timer ref="timerRef" />
</template>
```
