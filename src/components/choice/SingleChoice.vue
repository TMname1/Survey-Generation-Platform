<script lang="ts" setup>
import { computed } from 'vue';
import { useSingleChoiceStore } from '@/stores/choice/singleChoice';
import { ref } from 'vue';

const store = useSingleChoiceStore();

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

const stageVal = ref(0);
</script>
<template>
  <div :style="containerStyle">
    <h1 class="mb-5" :style="titleStyle">{{ store.title }}</h1>
    <p class="mb-5" :style="descStyle">{{ store.desc }}</p>
    <el-radio-group v-model="stageVal">
      <el-radio v-for="(opt, index) in store.options" :key="index" :label="opt" :value="opt">{{
        opt
      }}</el-radio>
    </el-radio-group>
  </div>
</template>
