<script lang="ts" setup>
import ButtonSelection from '@/components/ButtonSelection.vue';
const btnData = [{ id: '文本输入', name: '文本输入' }];
</script>

<template>
  <ButtonSelection :data="btnData"></ButtonSelection>
</template>
