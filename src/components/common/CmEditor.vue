<script lang="ts" setup>
import Editor from '@toast-ui/editor';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';

import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';

type Props = {
  height?: string;
  placeholder?: string;
};

const props = withDefaults(defineProps<Props>(), {
  height: '320px',
  placeholder: '내용을 입력해 주세요.',
});

const emits = defineEmits<{
  (e: 'ready'): void;
  (e: 'change'): void;
}>();

let editor: any = null;

const editorRef = ref();

function init() {
  if (editor) {
    return;
  }

  editor = new Editor({
    el: editorRef.value,
    height: props.height,
    initialEditType: 'wysiwyg', // 초기 모드 설정 markdown | wysiwyg
    hideModeSwitch: true, // 모드 스위치 노출 설정
    // 툴바
    toolbarItems: [
      ['heading', 'bold', 'italic', 'strike'],
      ['ul', 'ol', 'indent', 'outdent'],
      ['table', 'link'],
    ],
    plugins: [colorSyntax], // 폰트 컬러 플러그인 적용
    placeholder: props.placeholder,
  });

  editor.removeHook('addImageBlobHook'); // 이미지 업로드 방지

  editor.on('change', handleChange);

  emits('ready');
}

// 변경 이벤트 핸들러
function handleChange() {
  emits('change');
}

// ==================== expose ====================
function setContent(content: string) {
  editor.setHTML(content);
  editor.moveCursorToStart();
}

function getContent() {
  return editor.getHTML();
}

function clearContent() {
  editor.reset();
}

onMounted(() => {
  init();
});

onBeforeUnmount(() => {
  editor?.destroy();
});

defineExpose({
  setContent,
  getContent,
  clearContent,
});
</script>

<template>
  <div ref="editorRef" class="cm-editor"></div>
</template>

<style></style>
