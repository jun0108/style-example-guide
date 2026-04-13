<script lang="ts" setup>
import closeIcon from '@/assets/images/icon/close__line--818.svg?url';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

type Placement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end';

type Props = {
  desc: string;
  placement?: Placement;
};

const BREAKPONT = 1000;

const props = withDefaults(defineProps<Props>(), {
  placement: 'bottom',
});

const triggerRef = ref();

let instance: any = undefined;

// 툴팁 생성
function createTooltip() {
  const content = document.createElement('div');
  content.classList.add('cm-tooltip__inner');

  const msg = document.createElement('div');
  msg.classList.add('cm-tooltip__message');
  msg.innerText = props.desc;

  const close = document.createElement('div');
  close.classList.add('cm-tooltip__close');

  const button = document.createElement('button');
  button.classList.add('cm-tooltip__close');
  
  button.onclick = hide;
  const img = document.createElement('img');
  img.src = closeIcon;

  button.appendChild(img);
  close.appendChild(button);
  content.appendChild(msg);
  content.appendChild(button);

  let placement = props.placement;
  if (document.body.offsetWidth < BREAKPONT && ['right', 'right-start', 'right-end'].includes(props.placement)) {
    placement = 'bottom';
  }

  instance = tippy(triggerRef.value, {
    placement: placement,
    content: content,
    allowHTML: true,
    hideOnClick: true,
    interactive: true,
    interactiveDebounce: 60,
    appendTo: () => document.body,
  });
}

function hide() {
  instance.hide();
}

onMounted(() => {
  createTooltip();
});

onBeforeMount(() => {
  if (instance) {
    instance.destroy();
  }
});
</script>

<template>
  <div class="cm-tooltip">
    <div ref="triggerRef" class="cm-tooltip__icon">
      <slot>
        <span class="cm-icon cm-icon--info-circle" aria-hidden="true" />
      </slot>
    </div>
  </div>
</template>

<style></style>
