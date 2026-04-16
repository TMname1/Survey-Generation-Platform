<script lang="ts" setup>
import ButtonSelection from '@/components/ButtonSelection.vue';
import { useMaterialsStore } from '@/stores/materials';

const materialsStore = useMaterialsStore();
</script>

<template>
  <ButtonSelection :data="materialsStore.remarkBtnData"></ButtonSelection>
</template>
