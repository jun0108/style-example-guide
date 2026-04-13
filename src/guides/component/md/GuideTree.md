# 트리

## Props

| 이름                 | 타입                                                                   | 기본값           | 필수 | 설명                                                   |
| -------------------- | ---------------------------------------------------------------------- | ---------------- | ---- | ------------------------------------------------------ |
| id                   | string                                                                 | 랜덤 값 자동생성 |      | 트리 id                                                |
| data                 | any[]                                                                  | []               |      | 트리에 출력할 데이터                                   |
| idKey                | string                                                                 |                  | 필수 | 데이터 중 트리 아이템 id로 사용할 key                  |
| nameKey              | string                                                                 |                  | 필수 | 데이터 중 트리 아이템 name으로 사용할 key              |
| parentIdKey          | string                                                                 |                  | 필수 | 트리 아이템의 부모 아이템의 key                        |
| orderByKey           | string                                                                 |                  |      | 데이터 중 정렬에 사용할 key                            |
| depthLevelKey        | string                                                                 |                  |      | 데이터 중 깊이 레벨에 사용할 key                       |
| rootId               | string \| number                                                       | undefined        |      | 최상단 데이터의 id 값                                  |
| type                 | 'basic' \| 'bordered'                                                  | 'basic'          |      | 트리 스타일 타입                                       |
| checkable            | boolean                                                                | false            |      | 체크박스 사용 여부                                     |
| checkboxClass        | string                                                                 |                  |      | 체크박스 스타일                                        |
| useIndeterminate     | boolean                                                                | false            |      | 체크 시 indeterminate 항목 사용 여부                   |
| includeIndeterminate | boolean                                                                | false            |      | 체크 데이터 가져오는 경우 indeterminate 항목 포함 여부 |
| draggable            | boolean                                                                | false            |      | 트리 드래그 여부                                       |
| selectable           | boolean                                                                | false            |      | 트리 아이템 선택 여부                                  |
| expandAll            | boolean                                                                | true             |      | 전체 확장 여부                                         |
| expandIds            | any[]                                                                  |                  |      | 확장 id                                                |
| expandLevel          | number                                                                 |                  |      | 확장 레벨                                              |
| maxDepth             | number                                                                 |                  |      | 최대 깊이                                              |
| beforeDrop           | (dragItem: any, dropItem: any, dropPosition: DropPosition) => boolean; |                  |      | 드래그 사용 시 드롭 전 확인                            |

## Emits

| 이벤트      | 타입                                                                                                                        | 설명                                             |
| ----------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| select      | (item :any) => void                                                                                                         | 트리 아이템 선택                                 |
| check       | (items: any[]) => void                                                                                                      | 체크 변경 시                                     |
| error-depth | (depth: number) => void                                                                                                     | 최대 깊이 설정 시 최대 깊이 이상으로 이동한 경우 |
| draged      | (items: any[], <br/>dragItemId: string \|number, <br/>dropItemId: string \|number, <br/>dropPosition: DropPosition) => void | 드래그 앤 드롭 완료 시                           |

## Slots

| 이름  | 설명             |
| ----- | ---------------- |
| label | 라벨 영역 커스텀 |

## Exposed API

| 이름               | 타입                                | 설명                                          |
| ------------------ | ----------------------------------- | --------------------------------------------- |
| getData            | () => any[]                         | 트리 데이터 조회                              |
| getCheckedData     | () => any[]                         | 체크된 아이템의 데이터 조회                   |
| setCheckedData     | (ids: (string \| number)[]) => void | 트리 아이템의 체크                            |
| clearCheckedData   | () => void                          | 체크 아이템 초기화                            |
| getSelectedData    | () => any                           | 선택 아이템의 데이터 조회                     |
| setSelectedData    | (id: string \| number) => void      | 선택 아이템 설정                              |
| getChangedData     | () => any[]                         | 드래그앤 드롭으로 이동된 아이템의 데이터 조회 |
| getChangedTreeData | () => TreeItem[]                    | 드래그앤 드롭으로 이동된 아이템 조회          |
| clearChangedData   | () => void                          | 드래그앤 드롭 이동 데이터 초기화              |

## Usage

별도의 import 없이 사용한다.

### 기본 사용

```vue
<script>
const data = ref<MenuItem[]>([
  { menuId: 'M010000', parentMenuId: 'ROOT', menuNm: '메뉴 1', orderBy: 1, useYn: 'Y' },
  { menuId: 'M010100', parentMenuId: 'M010000', menuNm: '메뉴 1-1', orderBy: 1, useYn: 'Y' },
  { menuId: 'M010101', parentMenuId: 'M010100', menuNm: '메뉴 1-1-1', orderBy: 1, useYn: 'Y' },
  { menuId: 'M010102', parentMenuId: 'M010100', menuNm: '메뉴 1-1-2', orderBy: 2, useYn: 'Y' },
  { menuId: 'M010200', parentMenuId: 'M010000', menuNm: '메뉴 1-2', orderBy: 2, useYn: 'Y' },
  { menuId: 'M010300', parentMenuId: 'M010000', menuNm: '메뉴 1-3', orderBy: 3, useYn: 'Y' },
  { menuId: 'M010301', parentMenuId: 'M010300', menuNm: '메뉴 1-3-1', orderBy: 1, useYn: 'Y' },
  { menuId: 'M020000', parentMenuId: 'ROOT', menuNm: '메뉴 2', orderBy: 2, useYn: 'N' },
  { menuId: 'M020100', parentMenuId: 'M020000', menuNm: '메뉴 2-1', orderBy: 1, useYn: 'N' },
  { menuId: 'M020200', parentMenuId: 'M020000', menuNm: '메뉴 2-2', orderBy: 2, useYn: 'N' },
  { menuId: 'M030000', parentMenuId: 'ROOT', menuNm: '메뉴 3', orderBy: 3, useYn: 'Y' },
  { menuId: 'M030100', parentMenuId: 'M030000', menuNm: '메뉴 3-1 ', orderBy: 1, useYn: 'Y' },
  { menuId: 'M030200', parentMenuId: 'M030000', menuNm: '메뉴 3-2', orderBy: 2, useYn: 'Y' },
]);
</script>
<template>
  <cm-tree
    :data="data"
    id-key="menuId"
    name-key="menuNm"
    parent-id-key="parentMenuId"
    order-by-key="orderBy"
    root-id="ROOT"
  >
  </cm-tree>
</template>
```

### 트리 아이템 선택

```vue
<script>
// .. 중복 생략
function handleSelct(item: MenuItem) {
  console.log(item);
}
</script>
<template>
  <cm-tree
    :data="data"
    id-key="menuId"
    name-key="menuNm"
    parent-id-key="parentMenuId"
    order-by-key="orderBy"
    root-id="ROOT"
    selectable
    @select="handleSelect"
  >
  </cm-tree>
</template>
```

### 체크 박스 제공

```vue
<script>
// .. 중복 생략
function handleCheck(items: MenuItem[]) {
  console.log(items);
}
</script>
<template>
  <cm-tree
    ref="treeRef"
    :data="data"
    id-key="menuId"
    name-key="menuNm"
    parent-id-key="parentMenuId"
    order-by-key="orderBy"
    root-id="ROOT"
    checkable
    checkbox-class="cm-selector"
    @check="handleCheck"
  >
  </cm-tree>
</template>
```

#### 체크된 아이템 조회

```vue
<script>
// .. 중복 생략
const treeRef = ref();
function getCheckedData() {
  const checkedItems = treeRef.value.getCheckedData();
  console.log(checkedItems);
}
</script>
<template>
  <cm-tree
    ref="treeRef"
    :data="data"
    id-key="menuId"
    name-key="menuNm"
    parent-id-key="parentMenuId"
    order-by-key="orderBy"
    root-id="ROOT"
    checkable
    checkbox-class="cm-selector"
  >
  </cm-tree>
</template>
```

#### 체크 아이템 설정

```vue
<script>
// .. 중복 생략
const treeRef = ref();
function setCheckedData() {
  treeRef.value.setCheckedData(['M010000', 'M020000', 'M030000']);
}
</script>
<template>
  <cm-tree
    ref="treeRef"
    :data="data"
    id-key="menuId"
    name-key="menuNm"
    parent-id-key="parentMenuId"
    order-by-key="orderBy"
    root-id="ROOT"
    checkable
    checkbox-class="cm-selector"
  >
  </cm-tree>
</template>
```

#### 체크 아이템 초기화

```vue
<script>
// .. 중복 생략
const treeRef = ref();
function clearCheckedData() {
  treeRef.value.clearCheckedData();
}
</script>
<template>
  <cm-tree
    ref="treeRef"
    :data="data"
    id-key="menuId"
    name-key="menuNm"
    parent-id-key="parentMenuId"
    order-by-key="orderBy"
    root-id="ROOT"
    checkable
    checkbox-class="cm-selector"
  >
  </cm-tree>
</template>
```

### 트리 아이템 이동

```vue
<script>
// .. 중복 생략
function handleDraged(items: MenuItem[]) {
  console.log('draged', items);
}
</script>
<template>
  <cm-tree
    ref="treeRef"
    :data="data"
    id-key="menuId"
    name-key="menuNm"
    parent-id-key="parentMenuId"
    order-by-key="orderBy"
    root-id="ROOT"
    draggable
    @draged="handleDraged"
  >
  </cm-tree>
</template>
```

#### 이동 최대 깊이 설정

```vue
<script>
// .. 중복 생략
function handleErrorDepth(depth: number) {
  console.error('이동 최대 깊이는 ' + depth + '뎁스 입니다.');
}
</script>
<template>
  <cm-tree
    ref="treeRef"
    :data="data"
    id-key="menuId"
    name-key="menuNm"
    parent-id-key="parentMenuId"
    order-by-key="orderBy"
    root-id="ROOT"
    draggable
    :max-depth="3"
    @error-depth="handleErrorDepth"
  >
  </cm-tree>
</template>
```

#### 이동 가능 확인

```vue
<script>
// .. 중복 생략
function beforeDrop(dragItem: MenuItem, dropItem: MenuItem, dropPosition: DropPosition) {
  if (dropItem.menuId === 'M020000' && dropPosition === 'NODE') {
    console.log('cannot drop');
    return false;
  }
  return true;
}
</script>
<template>
  <cm-tree
    ref="treeRef"
    :data="data"
    id-key="menuId"
    name-key="menuNm"
    parent-id-key="parentMenuId"
    order-by-key="orderBy"
    root-id="ROOT"
    draggable
    :before-drop="beforeDrop"
  >
  </cm-tree>
</template>
```

#### 이동된 트리 아이템 조회

```vue
<script>
// .. 중복 생략
const treeRef = ref();
function getChangedData() {
  const changedData = treeRef.value.getChangedData();
  console.log(changedData);
}
</script>
<template>
  <cm-tree
    ref="treeRef"
    :data="data"
    id-key="menuId"
    name-key="menuNm"
    parent-id-key="parentMenuId"
    order-by-key="orderBy"
    root-id="ROOT"
    draggable
  >
  </cm-tree>
</template>
```

### 라벨 영역 커스텀

```vue
<template>
  <cm-tree
    :data="data"
    id-key="menuId"
    name-key="menuNm"
    parent-id-key="parentMenuId"
    order-by-key="orderBy"
    root-id="ROOT"
  >
    <template #label="item">
      <div class="flex items-center justify-between">
        <div class="text-ellipsis whitespace-nowrap overflow-hidden">
          {{ item.menuNm }}
        </div>
        <button @click="">선택</button>
      </div>
    </template>
  </cm-tree>
</template>
```
