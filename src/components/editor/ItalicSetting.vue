<template>
  <div class="mb-2.5">
    <div class="flex items-center justify-start gap-4">
      <div class="text-sm text-[#606266]">标题斜体</div>
      <div class="text-sm text-[#909399]">{{ store.titleItalic }}</div>
      <div class="flex gap-2">
        <div
          class="flex cursor-pointer items-center justify-center gap-1 rounded border border-[#dcdfe6] px-3 py-1.5 text-[#606266] transition-all duration-300 hover:border-[#c6e2ff] hover:bg-[#ecf5ff] hover:text-[#409eff]"
          :class="{
            'border-[#409eff]! bg-[#ecf5ff]! text-[#409eff]!': store.titleItalic === '斜体',
          }"
          @click="store.titleItalic = store.titleItalic === '斜体' ? '正常' : '斜体'"
        >
          <div class="h-4 w-4"><img src="@/assets/svg/italic.svg" alt="标题斜体" /></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, type Ref } from 'vue';
import type { SurveyItem } from '@/stores/index';

const store = inject<Ref<SurveyItem>>('activeStore')!;
</script>
