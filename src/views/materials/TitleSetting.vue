<template>
  <div class="mb-2.5 flex items-center">
    <div class="w-20 shrink-0 text-sm text-[#606266]">标题内容</div>
    <el-input v-model="store.title" clearable style="width: 200px" />
  </div>
</template>

<script setup lang="ts">
import { inject, type Ref } from 'vue';
import type { useSingleChoiceStore } from '@/stores/choice/singleChoice';

type ActiveStore = ReturnType<typeof useSingleChoiceStore>;

const store = inject<Ref<ActiveStore>>('activeStore')!;
</script>
