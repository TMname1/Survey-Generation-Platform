<script lang="ts" setup>
import { computed, ref } from 'vue';

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  questionIndex: {
    type: Number,
    default: undefined,
  },
});

// 格式化序号为两位数 (01, 02, ..., 10, 11)
const formattedIndex = computed(() => {
  if (props.questionIndex === undefined) return '';
  return props.questionIndex.toString().padStart(2, '0');
});

const store = props.data;

const containerStyle = computed(() => ({
  textAlign: store.position === '居中对齐' ? ('center' as const) : ('left' as const),
}));

const titleStyle = computed(() => ({
  fontSize: `${store.titleSize}px`,
  fontWeight: store.titleWeight === '加粗' ? 'bold' : 'normal',
  fontStyle: store.titleItalic === '斜体' ? 'italic' : 'normal',
  color: store.titleColor,
}));

const descStyle = computed(() => ({
  fontSize: `${store.descSize}px`,
  fontWeight: store.descWeight === '加粗' ? 'bold' : 'normal',
  fontStyle: store.descItalic === '斜体' ? 'italic' : 'normal',
  color: store.descColor,
}));

const dateVal = ref('');
</script>

<template>
  <div :style="containerStyle" class="wrap-anywhere">
    <h1 class="mb-5" :style="titleStyle">
      <span v-if="formattedIndex" class="mr-2 font-bold text-black">{{ formattedIndex }}.</span>
      {{ store.title }}
    </h1>
    <p class="mb-5" :style="descStyle">{{ store.desc }}</p>
    <el-date-picker v-model="store.answer" type="date" placeholder="选择日期" />
  </div>
</template>
