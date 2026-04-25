<template>
  <div class="mb-2.5 flex items-center">
    <div class="w-20 shrink-0 text-[14px] text-[#606266]">描述内容</div>
    <el-input v-model="store.desc" type="textarea" :rows="2" clearable class="w-50" />
  </div>
</template>

<script setup lang="ts">
import { inject, type Ref } from 'vue';
import type { SurveyItem } from '@/stores/survey';

const store = inject<Ref<SurveyItem>>('activeStore')!;
</script>
