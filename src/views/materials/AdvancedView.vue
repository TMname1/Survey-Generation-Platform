<script lang="ts" setup>
import ButtonSelection from '@/components/ButtonSelection.vue';
const btnData = [
  { id: '评价', name: '评价' },
  { id: '日期', name: '日期' },
];
</script>

<template>
  <ButtonSelection :data="btnData"></ButtonSelection>
</template>
