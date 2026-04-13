# Grid

## Props

| 이름             | 타입                  | 기본값                    | 필수 | 설명                         |
| ---------------- | --------------------- | ------------------------- | ---- | ---------------------------- |
| data             | Record<string, any>[] | []                        |      |                              |
| sortable         | boolean               | false                     |      | 정렬 사용 여부               |
| resizable        | boolean               | false                     |      | 컬럼 리사이즈 사용 여부      |
| nodata           | string                | 검색된 데이터가 없습니다. |      | 데이터 없는 경우 출력 메시지 |
| useCustomSort    | boolean               | false                     |      | 커스텀 정렬 사용 여부        |
| useRowSelection  | boolean               | false                     |      | 행 선택 사용 여부            |
| rowSelectionType | 'single' \| 'mluti'   | 'multi'                   |      | 행 선택 타입                 |
| isRowSelectable  | IsRowSelectable       |                           |      | ag-grid-community 타입       |

## Emits

| 이벤트          | 타입                                                      | 설명            |
| --------------- | --------------------------------------------------------- | --------------- |
| changeSelection | (data:Record<string, any>[]) => void                      | 선택 변경 시    |
| clickCell       | (field: string, data: Record<string, any>) => void        | 셀 클릭 시      |
| clickRow        | (data: Record<string, any>) => void                       | 행 클릭 시      |
| dbclickRow      | (data: Record<string, any>) => void                       | 행 더블 클릭 시 |
| changeSort      | (field: string, sort: SortDirection \| undefined) => void | 정렬 변경 시    |

## Expose API

| 이름            | 타입                            | 설명               |
| --------------- | ------------------------------- | ------------------ |
| refreshColumn   | () => void                      | 컬럼 정보 새로고침 |
| zoomOut         | () => void                      |                    |
| setZoom         | (zoom: number) => void          |                    |
| setCenter       | (position: MapPosition) => void |                    |
| setMarkers      | (markers: MapMarker[]) => void  |                    |
| clearMarkers    | () => void                      |                    |
| closeInfoWindow | () => void                      |                    |

## Types

`ag-grid-community`의 타입을 사용한다.

## Usage

별도의 import 없이 사용한다.

### 기본 사용

```vue
<script>
const data = ref([]);
</script>
<template>
  <cm-grid :data="data">
    <cm-grid-column field="id" headerName="아이디" :width="100" align="center"></cm-grid-column>
    <cm-grid-column field="name" headerName="이름"></cm-grid-column>
    <cm-grid-column field="email" headerName="이메일"></cm-grid-column>
    <cm-grid-column field="phone" headerName="전화번호"></cm-grid-column>
  </cm-grid>
</template>
```

### 정렬 사용

```vue
<script>
const data = ref([]);

function handleChangeSort(field: string, sort: SortDirection | undefined) {
  console.log('change sort', field, sort);
}
</script>
<template>
  <cm-grid :data="data" sortable @change-sort="handleChangeSort">
    <cm-grid-column field="id" headerName="아이디" :width="100" align="center"></cm-grid-column>
    <cm-grid-column field="name" headerName="이름"></cm-grid-column>
    <cm-grid-column field="email" headerName="이메일"></cm-grid-column>
    <cm-grid-column field="phone" headerName="전화번호"></cm-grid-column>
  </cm-grid>
</template>
```

### 컬럼 리사이징 사용

```vue
<script>
const data = ref([]);
</script>
<template>
  <cm-grid :data="data" resizable>
    <cm-grid-column field="id" headerName="아이디" :width="100" align="center"></cm-grid-column>
    <cm-grid-column field="name" headerName="이름"></cm-grid-column>
    <cm-grid-column field="email" headerName="이메일"></cm-grid-column>
    <cm-grid-column field="phone" headerName="전화번호"></cm-grid-column>
  </cm-grid>
</template>
```

### 행 선택

```vue
<script>
const data = ref([]);

function handleChangeSelection(rows: Record<string, any>[]) {
  console.log(rows);
}
</script>
<template>
  <cm-grid :data="data" use-row-selection @change-selection="handleChangeSelection">
    <cm-grid-column field="id" headerName="아이디" :width="100" align="center"></cm-grid-column>
    <cm-grid-column field="name" headerName="이름"></cm-grid-column>
    <cm-grid-column field="email" headerName="이메일"></cm-grid-column>
    <cm-grid-column field="phone" headerName="전화번호"></cm-grid-column>
  </cm-grid>
</template>
```

### 셀 클릭 이벤트

```vue
<script>
const data = ref([]);

function handleClickCell(field: string, data: Record<string, any>) {
  console.log('cell clicked', field, data);
}
</script>
<template>
  <cm-grid :data="data" @click-cell="handleClickCell">
    <cm-grid-column field="id" headerName="아이디" :width="100" align="center"></cm-grid-column>
    <cm-grid-column field="name" headerName="이름"></cm-grid-column>
    <cm-grid-column field="email" headerName="이메일"></cm-grid-column>
    <cm-grid-column field="phone" headerName="전화번호"></cm-grid-column>
  </cm-grid>
</template>
```

### 행 클릭 이벤트

```vue
<script>
const data = ref([]);

function handleClickRow(data: Record<string, any>) {
  console.log('row clicked', data);
}
</script>
<template>
  <cm-grid :data="data" @click-row="handleClickRow">
    <cm-grid-column field="id" headerName="아이디" :width="100" align="center"></cm-grid-column>
    <cm-grid-column field="name" headerName="이름"></cm-grid-column>
    <cm-grid-column field="email" headerName="이메일"></cm-grid-column>
    <cm-grid-column field="phone" headerName="전화번호"></cm-grid-column>
  </cm-grid>
</template>
```

### 행 더블클릭 이벤트

```vue
<script>
const data = ref([]);

function handleDbClickRow(data: Record<string, any>) {
  console.log('row dbclicked', data);
}
</script>
<template>
  <cm-grid :data="data" @dbclick-row="handleDbClickRow">
    <cm-grid-column field="id" headerName="아이디" :width="100" align="center"></cm-grid-column>
    <cm-grid-column field="name" headerName="이름"></cm-grid-column>
    <cm-grid-column field="email" headerName="이메일"></cm-grid-column>
    <cm-grid-column field="phone" headerName="전화번호"></cm-grid-column>
  </cm-grid>
</template>
```

### 컬럼 고정

```vue
<script>
const data = ref([]);
</script>
<template>
  <cm-grid :data="data">
    <!-- // pinned 사용 -->
    <cm-grid-column field="id" headerName="아이디" pinned="left" :min-width="100" align="center"></cm-grid-column>
    <cm-grid-column field="name" headerName="이름" pinned="left" :min-width="100"></cm-grid-column>
    <cm-grid-column field="email" headerName="이메일"></cm-grid-column>
    <cm-grid-column field="phone" headerName="전화번호"></cm-grid-column>
  </cm-grid>
</template>
```

### 일부 체크박스 비활성화

```vue
<script>
const data = ref([]);

function isRowSelectable(row: RowNode) {
  return row.data.id > 5;
}
</script>
<template>
  <cm-grid use-row-selection :is-row-selectable="isRowSelectable" @change-selection="handleChangeSelection">
    <cm-grid-column field="id" headerName="아이디" :width="100" align="center"></cm-grid-column>
    <cm-grid-column field="name" headerName="이름"></cm-grid-column>
    <cm-grid-column field="email" headerName="이메일"></cm-grid-column>
    <cm-grid-column field="phone" headerName="전화번호"></cm-grid-column>
  </cm-grid>
</template>
```

### 셀 커스텀

```vue
<script>
const data = ref([]);
</script>
<template>
  <cm-grid use-row-selection :is-row-selectable="isRowSelectable" @change-selection="handleChangeSelection">
    <cm-grid-column field="id" headerName="아이디" :width="100" align="center"></cm-grid-column>
    <cm-grid-column field="name" headerName="이름"></cm-grid-column>
    <cm-grid-column field="email" headerName="이메일">
      <!-- 템플릿 사용으로 커스텀 -->
      <template #default="props">
        <button
          class="py-[0.35rem] px-4 rounded-sm text-xs bg-[#3b3939] text-white hover:bg-[#5a5858] active:bg-[#1a1919] cursor-pointer"
          @click.stop="handleClickCustom(props.data)"
        >
          {{ props.data.email }}
        </button>
      </template>
    </cm-grid-column>
    <cm-grid-column field="phone" headerName="전화번호"></cm-grid-column>
  </cm-grid>
</template>
```
