<script lang="ts" setup>
import { computed } from 'vue';

interface RemarkData {
  type: string;
  remarkType: 'title' | 'paragraph';
  title: string;
  desc: string;
  position: '左对齐' | '居中对齐';
  titleSize: 22 | 20 | 18;
  descSize: 16 | 14 | 12;
  titleWeight: '加粗' | '正常';
  descWeight: '加粗' | '正常';
  titleItalic: '斜体' | '正常';
  descItalic: '斜体' | '正常';
  titleColor: string;
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

const textStyle = computed(() => {
  const isTitle = props.data.remarkType === 'title';
  return {
    fontSize: isTitle ? `${props.data.titleSize}px` : `${props.data.descSize}px`,
    fontWeight:
      (isTitle ? props.data.titleWeight : props.data.descWeight) === '加粗' ? 'bold' : 'normal',
    fontStyle:
      (isTitle ? props.data.titleItalic : props.data.descItalic) === '斜体' ? 'italic' : 'normal',
    color: isTitle ? props.data.titleColor : props.data.descColor,
  };
});
</script>

<template>
  <div :style="containerStyle" class="wrap-anywhere">
    <component :is="props.data.remarkType === 'title' ? 'h1' : 'p'" :style="textStyle">
      {{ props.data.remarkType === 'title' ? props.data.title : props.data.desc }}
    </component>
  </div>
</template>
