<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useDateStore } from '@/stores/advanced/date';

const store = useDateStore();

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

const dateVal = ref('');
</script>

<template>
  <div :style="containerStyle">
    <h1 class="mb-5" :style="titleStyle">{{ store.title }}</h1>
    <p class="mb-5" :style="descStyle">{{ store.desc }}</p>
    <el-date-picker v-model="dateVal" type="date" placeholder="选择日期" />
  </div>
</template>
