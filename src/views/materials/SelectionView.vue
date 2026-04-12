<script lang="ts" setup>
import ButtonSelection from '@/components/ButtonSelection.vue';
const btnData = [
  { id: '1', name: '单选题' },
  { id: '2', name: '多选题' },
  { id: '3', name: '下拉选择' },
  { id: '4', name: '图片单选题' },
];
</script>

<template>
  <ButtonSelection :data="btnData"></ButtonSelection>
</template>
