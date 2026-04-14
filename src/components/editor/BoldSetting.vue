<template>
  <div class="mb-2.5">
    <div class="flex items-center justify-start gap-4">
      <div class="text-[14px] text-[#606266]">标题加粗</div>
      <div class="text-[14px] text-[#909399]">{{ store.titleWeight }}</div>
      <div class="flex gap-2">
        <div
          class="flex cursor-pointer items-center justify-center gap-1 rounded border px-3 py-1.5 transition-all duration-300"
          :class="
            store.titleWeight === '加粗'
              ? 'border-[#409eff] bg-[#ecf5ff] text-[#409eff]'
              : 'border-[#dcdfe6] text-[#606266] hover:border-[#c6e2ff] hover:bg-[#ecf5ff] hover:text-[#409eff]'
          "
          @click="store.titleWeight = store.titleWeight === '加粗' ? '正常' : '加粗'"
        >
          <div class="h-4 w-4"><img src="@/assets/svg/bold.svg" alt="标题加粗" /></div>
        </div>
      </div>
    </div>
  </div>
  <div class="mb-2.5">
    <div class="flex items-center justify-start gap-4">
      <div class="text-[14px] text-[#606266]">描述加粗</div>
      <div class="text-[14px] text-[#909399]">{{ store.descWeight }}</div>
      <div class="flex gap-2">
        <div
          class="flex cursor-pointer items-center justify-center gap-1 rounded border px-3 py-1.5 transition-all duration-300"
          :class="
            store.descWeight === '加粗'
              ? 'border-[#409eff] bg-[#ecf5ff] text-[#409eff]'
              : 'border-[#dcdfe6] text-[#606266] hover:border-[#c6e2ff] hover:bg-[#ecf5ff] hover:text-[#409eff]'
          "
          @click="store.descWeight = store.descWeight === '加粗' ? '正常' : '加粗'"
        >
          <div class="h-4 w-4"><img src="@/assets/svg/bold.svg" alt="标题加粗" /></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, type Ref } from 'vue';
import type { useSingleChoiceStore } from '@/stores/choice/singleChoice';

type ActiveStore = ReturnType<typeof useSingleChoiceStore>;

const store = inject<Ref<ActiveStore>>('activeStore')!;
</script>
