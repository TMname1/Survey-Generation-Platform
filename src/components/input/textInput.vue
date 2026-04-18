<script lang="ts" setup>
import { computed, ref } from 'vue';

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
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
  color: store.descColor,
}));

const inputVal = ref('');
</script>

<template>
  <div :style="containerStyle" class="wrap-anywhere">
    <h1 class="mb-5" :style="titleStyle">{{ store.title }}</h1>
    <p class="mb-5" :style="descStyle">{{ store.desc }}</p>
    <el-input
      v-model="inputVal"
      :type="store.style === '多行文本' ? 'textarea' : 'text'"
      placeholder="请输入内容"
      :rows="store.style === '多行文本' ? 4 : undefined"
    />
  </div>
</template>
