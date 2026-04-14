<script lang="ts" setup>
import ButtonSelection from '@/components/ButtonSelection.vue';
const btnData = [
  { id: '单选题', name: '单选题' },
  { id: '多选题', name: '多选题' },
  { id: '下拉选择题', name: '下拉选择题' },
  // TODO: 完成图片选择
  // { id: '图片单选题', name: '图片单选题' },
  // { id: '图片多选题', name: '图片多选题' },
];
</script>

<template>
  <ButtonSelection :data="btnData"></ButtonSelection>
</template>
