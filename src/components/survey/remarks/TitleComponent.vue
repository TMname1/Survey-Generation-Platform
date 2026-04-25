<script lang="ts" setup>
import { computed } from 'vue';

interface RemarkData {
  type: string;
  remarkType: 'title' | 'paragraph';
  title: string;
  position: '左对齐' | '居中对齐';
  titleSize: 22 | 20 | 18;
  titleWeight: '加粗' | '正常';
  titleItalic: '斜体' | '正常';
  titleColor: string;
}

const props = defineProps({
  data: {
    type: Object as () => RemarkData,
    required: true,
  },
});

const containerStyle = computed(() => ({
  textAlign: props.data.position === '居中对齐' ? ('center' as const) : ('left' as const),
}));

const textStyle = computed(() => ({
  fontSize: `${props.data.titleSize}px`,
  fontWeight: props.data.titleWeight === '加粗' ? 'bold' : 'normal',
  fontStyle: props.data.titleItalic === '斜体' ? 'italic' : 'normal',
  color: props.data.titleColor,
}));
</script>

<template>
  <div :style="containerStyle" class="wrap-anywhere">
    <h1 :style="textStyle">{{ props.data.title }}</h1>
  </div>
</template>
