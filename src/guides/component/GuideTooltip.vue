<script lang="ts" setup></script>

<template>
  <div>
    <h1>툴팁</h1>

    <div class="grid grid-cols-2 gap-3">
      <div>
        <h2>Bottom (기본)</h2>
        <cm-tooltip desc="표시할 단말 모델을 선택하거나 원하는 위치로 순서를 변경할 수 있습니다." />
      </div>
      <div>
        <h2>Top</h2>
        <cm-tooltip placement="top" desc="표시할 단말 모델을 선택하거나 원하는 위치로 순서를 변경할 수 있습니다." />
      </div>
      <div>
        <h2>Right</h2>
        <cm-tooltip placement="right" desc="표시할 단말 모델을 선택하거나 원하는 위치로 순서를 변경할 수 있습니다.">
          <cm-token color="primary" size="sm">+9</cm-token>
        </cm-tooltip>
      </div>
      <div>
        <h2>Left</h2>
        <cm-tooltip placement="left" desc="표시할 단말 모델을 선택하거나 원하는 위치로 순서를 변경할 수 있습니다." />
      </div>
    </div>
  </div>
</template>
