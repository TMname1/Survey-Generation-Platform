<script lang="ts" setup>
import { computed } from 'vue';

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

const containerStyle = computed(() => ({
  textAlign: props.data.position === '居中对齐' ? ('center' as const) : ('left' as const),
}));

const titleStyle = computed(() => ({
  fontSize: `${props.data.titleSize}px`,
  fontWeight: props.data.titleWeight === '加粗' ? 'bold' : 'normal',
  fontStyle: props.data.titleItalic === '斜体' ? 'italic' : 'normal',
  color: props.data.titleColor,
}));

const descStyle = computed(() => ({
  fontSize: `${props.data.descSize}px`,
  fontWeight: props.data.descWeight === '加粗' ? 'bold' : 'normal',
  fontStyle: props.data.descItalic === '斜体' ? 'italic' : 'normal',
  color: props.data.descColor,
}));
</script>
<template>
  <div :style="containerStyle" class="wrap-anywhere">
    <h1 class="mb-5" :style="titleStyle">
      <span v-if="formattedIndex" class="mr-2 text-black font-bold">{{ formattedIndex }}.</span>
      {{ data.title }}
    </h1>
    <p class="mb-5" :style="descStyle">{{ data.desc }}</p>
    <el-checkbox-group>
      <el-checkbox v-for="(opt, index) in data.options" :key="index" :label="opt" :value="opt">{{
        opt
      }}</el-checkbox>
    </el-checkbox-group>
  </div>
</template>
