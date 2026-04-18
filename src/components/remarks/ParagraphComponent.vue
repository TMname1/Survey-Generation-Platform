<script lang="ts" setup>
import { computed } from 'vue';

interface RemarkData {
  type: string;
  remarkType: 'title' | 'paragraph';
  desc: string;
  position: '左对齐' | '居中对齐';
  descSize: 16 | 14 | 12;
  descWeight: '加粗' | '正常';
  descItalic: '斜体' | '正常';
  descColor: string;
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
  fontSize: `${props.data.descSize}px`,
  fontWeight: props.data.descWeight === '加粗' ? 'bold' : 'normal',
  fontStyle: props.data.descItalic === '斜体' ? 'italic' : 'normal',
  color: props.data.descColor,
}));
</script>

<template>
  <div :style="containerStyle" class="wrap-anywhere">
    <p :style="textStyle">{{ props.data.desc }}</p>
  </div>
</template>
