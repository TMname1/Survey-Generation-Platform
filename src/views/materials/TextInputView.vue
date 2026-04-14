<script lang="ts" setup>
import ButtonSelection from '@/components/ButtonSelection.vue';
const btnData = [
  { id: '单行文本', name: '单行文本' },
  { id: '多行文本', name: '多行文本' },
];
</script>

<template>
  <ButtonSelection :data="btnData"></ButtonSelection>
</template>
