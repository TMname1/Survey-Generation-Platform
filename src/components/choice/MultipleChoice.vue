<script lang="ts" setup>
import { computed } from 'vue';
import { useMultipleChoiceStore } from '@/stores/choice/multipleChoice';
import { ref } from 'vue';

const store = useMultipleChoiceStore();

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

const stageValList = ref([]);
</script>
<template>
  <div :style="containerStyle">
    <h1 class="mb-5" :style="titleStyle">{{ store.title }}</h1>
    <p class="mb-5" :style="descStyle">{{ store.desc }}</p>
    <el-checkbox-group v-model="stageValList">
      <el-checkbox v-for="(opt, index) in store.options" :key="index" :label="opt" :value="opt">{{
        opt
      }}</el-checkbox>
    </el-checkbox-group>
  </div>
</template>
