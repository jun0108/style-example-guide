# Datepicker

`@vuepic/vue-datepicker`를 사용하고 있으며 일부 타입은 라이브러리의 타입을 사용한다.

다국어 항목은 `date-fns/locale`를 사용한다.

## Props

| 이름             | 타입                                                                                                                     | 기본값       | 필수 | 설명                                     |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------ | ---- | ---------------------------------------- |
| v-model          | any                                                                                                                      |              |      |                                          |
| label            | string                                                                                                                   |              |      | 라벨                                     |
| desc             | string                                                                                                                   |              |      | 설명                                     |
| disabled         | boolean                                                                                                                  | false        |      |                                          |
| readonly         | boolean                                                                                                                  | false        |      |                                          |
| placeholder      | string                                                                                                                   | '날짜 선택'  |      |                                          |
| required         | boolean                                                                                                                  | false        |      | 필수 여부                                |
| requiredMsg      | string                                                                                                                   |              |      | 필수값 오류 시 출력 메시지               |
| format           | string                                                                                                                   | 'yyyy-MM-dd' |      | 데이트 포맷                              |
| range            | boolean \| RangeConfig                                                                                                   | false        |      | 기간 선택 여부                           |
| multiCalendars   | boolean                                                                                                                  | false        |      | 캘린더 여러개 노출 여부                  |
| yearPicker       | boolean                                                                                                                  | false        |      | 연도 선택 캘린더 출력 여부               |
| monthPicker      | boolean                                                                                                                  | false        |      | 월 선택 캘린더 출력 여부                 |
| timePicker       | boolean                                                                                                                  | false        |      | 시간 선택 출력 여부                      |
| weekPicker       | boolean                                                                                                                  | false        |      | 주 선택 출력 여부                        |
| locale           | Locale                                                                                                                   | ko           |      | 언어                                     |
| clearable        | boolean                                                                                                                  | true         |      | 삭제 버튼 제공 여부                      |
| autoApply        | boolean                                                                                                                  | false        |      | 자동 적용 여부                           |
| minDate          | Date \| string                                                                                                           |              |      | 선택 가능 최소 날짜                      |
| maxDate          | Date \| string                                                                                                           |              |      | 선택 가능 최대 날짜                      |
| minTime          | { hours: number; minutes: number; seconds?: number }                                                                     |              |      | 선택 가능 최소 시간                      |
| maxTime          | { hours: number; minutes: number; seconds?: number }                                                                     |              |      | 선택 가능 최대 시간                      |
| timePickerInline | boolean                                                                                                                  |              |      | 시간 선택 inline 제공 여부               |
| enableTimePicker | boolean                                                                                                                  |              |      | 시간 선택 제공 여부                      |
| enableSeconds    | boolean                                                                                                                  |              |      | 초 선택 제공 여부                        |
| hoursIncrement   | number \| string                                                                                                         | 1            |      | 시간 증감 단위                           |
| minutesIncrement | number \| string                                                                                                         | 5            |      | 분 증감 단위                             |
| secondsIncrement | number \| string                                                                                                         | 10           |      | 초 증감 단위                             |
| startTime        | { hours?: number; minutes?: number; seconds?: number }<br /> \| { hours?: number; minutes?: number; seconds?: number }[] |              |      | 시작 시간                                |
| disabledDates    | Date[] \| string[] \| ((date: Date) => boolean)                                                                          |              |      | 선택 불가능 날짜                         |
| dataRequiredMsg  | string                                                                                                                   |              |      | 데이터 검증 후 사용하기 위한 오류 메시지 |

## Emits

| 이벤트         | 타입                 | 설명                             |
| -------------- | -------------------- | -------------------------------- |
| change         | () => void           | 값 변경 시                       |
| click-date     | (date: Date) => void | 날짜 선택 시                     |
| invalid-select | () => void           | 날짜 선택 하지 않은 경우         |
| invalid-date   | () => void           | 선택 불가능한 날짜를 선택한 경우 |

## Exposed API

| 이름            | 타입          | 설명                                     |
| --------------- | ------------- | ---------------------------------------- |
| validate        | () => boolean | 입력 및 포맷 검증                        |
| focus           | () => void    | 입력 항목에 focus                        |
| dataRequiredMsg | string        | 데이터 검증 후 사용하기 위한 오류 메시지 |

## Usage

별도의 import 없이 사용한다.

### 기본 사용

```vue
<template>
  <v-datepicker />
</template>
```

### 데이터 바인딩

```vue
<script>
const date = ref('');
</script>
<template>
  <v-datepicker v-model="date" />
</template>
```

### 라벨 제공

```vue
<template>
  <v-datepicker label="이름" />
</template>
```

### 설명 제공

```vue
<template>
  <v-datepicker desc="날짜를 선택해 주세요" />
</template>
```

### disabled

```vue
<template>
  <v-datepicker disabled />
</template>
```

### Placeholder

```vue
<template>
  <v-datepicker placeholder="날짜를 선택해 주세요" />
</template>
```

### 필수 입력

라벨에 필수 입력 표시(\*)가 제공되고 데이터 검증 시 필수 입력을 검증한다.

```vue
<template>
  <v-datepicker required />
</template>
```

#### 필수 입력 검증 메시지

```vue
<template>
  <v-datepicker required required-msg="값을 입력해 주세요" />
</template>
```

### 날짜 포맷 설정

```vue
<template>
  <v-datepicker format="yyyy-MM-dd HH:mm:ss" />
</template>
```

### min-date

```vue
<template>
  <v-datepicker min-date="2026-01-30" />
</template>
```

### max-date

```vue
<template>
  <v-datepicker max-date="2026-02-15" />
</template>
```

### 선택 불가능 날짜 설정

```vue
<template>
  <v-datepicker
    :disabled-dates="[dayjs().subtract(1, 'd').format('YYYY-MM-DD'), dayjs().add(1, 'd').format('YYYY-MM-DD')]"
  />
</template>
```

### 날짜 - 시간 선택

```vue
<template>
  <v-datepicker format="yyyy-MM-dd HH:mm" enable-time-picker />
</template>
```

### 시간 inline 선택

```vue
<template>
  <v-datepicker format="yyyy-MM-dd HH:mm" enable-time-picker time-picker-inline />
</template>
```

### 기간 선택

```vue
<template>
  <v-datepicker range />
</template>
```

### 최소 기간 설정

```vue
<template>
  <v-datepicker range :range="{ minRange: 3 }" />
</template>
```

### 최대 기간 설정

```vue
<template>
  <v-datepicker range :range="{ maxRange: 3 }" />
</template>
```

### 자동 기간 설정

```vue
<template>
  <v-datepicker range :range="{ autoRange: 3 }" />
</template>
```

### 기간 최소 선택

```vue
<template>
  <v-datepicker range :min-date="dayjs().subtract(15, 'd').format('YYYY-MM-DD')" />
</template>
```

### 기간 최대 선택

```vue
<template>
  <v-datepicker range :max-date="dayjs().add(15, 'd').format('YYYY-MM-DD')" />
</template>
```
