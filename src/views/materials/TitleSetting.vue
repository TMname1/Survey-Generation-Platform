<template>
  <div class="mb-2.5 flex items-center">
    <div class="w-20 shrink-0 text-sm text-[#606266]">标题内容</div>
    <el-input v-model="title" clearable style="width: 200px" />
  </div>
</template>

<script setup lang="ts">
import { useSingleChoiceStore } from '@/stores/singleChoice';
import { storeToRefs } from 'pinia';

const store = useSingleChoiceStore();
const { title } = storeToRefs(store);
</script>
