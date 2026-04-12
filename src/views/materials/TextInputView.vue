<script lang="ts" setup>
import ButtonSelection from '@/components/ButtonSelection.vue';
const btnData = [
  { id: '1', name: '测试1' },
  { id: '2', name: '测试2' },
  { id: '3', name: '测试3' },
  { id: '4', name: '测试4' },
];
</script>

<template>
  <ButtonSelection :data="btnData"></ButtonSelection>
</template>
