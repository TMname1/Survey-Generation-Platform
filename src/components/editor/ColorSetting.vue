<template>
  <div
    class="mb-2.5 flex items-center"
    v-show="store.type !== '备注说明' || store.remarkType === 'title'"
  >
    <div class="w-35 text-[14px] text-[#606266]">
      标题颜色 <span class="ml-2 font-mono text-[13px] text-[#909399]">{{ store.titleColor }}</span>
    </div>
    <el-color-picker v-model="store.titleColor" />
  </div>
  <div
    class="mb-2.5 flex items-center"
    v-show="!(store.type === '备注说明' && store.remarkType === 'title')"
  >
    <div class="w-35 text-[14px] text-[#606266]">
      描述颜色 <span class="ml-2 font-mono text-[13px] text-[#909399]">{{ store.descColor }}</span>
    </div>
    <el-color-picker v-model="store.descColor" />
  </div>
</template>

<script setup lang="ts">
import { inject, type Ref } from 'vue';
import type { SurveyItem } from '@/stores/index';

const store = inject<Ref<SurveyItem>>('activeStore')!;
</script>
