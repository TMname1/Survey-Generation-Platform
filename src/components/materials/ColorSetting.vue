<template>
  <div class="mb-2.5 flex items-center">
    <div class="w-35 text-[14px] text-[#606266]">
      标题颜色 <span class="ml-2 font-mono text-[13px] text-[#909399]">{{ titleColor }}</span>
    </div>
    <el-color-picker v-model="titleColor" />
  </div>
  <div class="mb-2.5 flex items-center">
    <div class="w-35 text-[14px] text-[#606266]">
      描述颜色 <span class="ml-2 font-mono text-[13px] text-[#909399]">{{ descColor }}</span>
    </div>
    <el-color-picker v-model="descColor" />
  </div>
</template>

<script setup lang="ts">
import { useSingleChoiceStore } from '@/stores/singleChoice';
import { storeToRefs } from 'pinia';

const store = useSingleChoiceStore();
const { titleColor, descColor } = storeToRefs(store);
</script>
