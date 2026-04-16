<template>
  <div class="mb-5" v-show="store.hasTitleSize !== false">
    <div class="mb-2 flex items-center justify-between">
      <div class="text-[14px] text-[#606266]">标题大小</div>
      <div class="text-[14px] text-[#909399]">{{ store.titleSize }}px</div>
      <div class="flex gap-2">
        <div
          v-for="(size, index) in titleSizes"
          :key="size"
          class="flex cursor-pointer items-center justify-center gap-1 rounded-sm border px-3 py-1.5 transition-all duration-300 hover:border-[#c6e2ff] hover:bg-[#ecf5ff] hover:text-[#409eff]"
          :class="
            store.titleSize === size
              ? 'border-[#409eff] bg-[#ecf5ff] text-[#409eff]'
              : 'border-[#dcdfe6] text-[#606266]'
          "
          @click="store.titleSize = size"
        >
          <div
            :class="['h-6 w-6', 'h-5 w-5', 'h-4 w-4', 'h-3 w-3'][Math.min(index, 3)] || 'h-4 w-4'"
          >
            <img src="@/assets/svg/size-title.svg" alt="标题大小" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="mb-5" v-show="store.hasDescSize !== false">
    <div class="mb-2 flex items-center justify-between">
      <div class="text-[14px] text-[#606266]">描述大小</div>
      <div class="text-[14px] text-[#909399]">{{ store.descSize }}px</div>
      <div class="flex gap-2">
        <div
          v-for="(size, index) in descSizes"
          :key="size"
          class="flex cursor-pointer items-center rounded-sm border px-3 py-1.5 transition-all duration-300 hover:border-[#c6e2ff] hover:bg-[#ecf5ff] hover:text-[#409eff]"
          :class="
            store.descSize === size
              ? 'border-[#409eff] bg-[#ecf5ff] text-[#409eff]'
              : 'border-[#dcdfe6] text-[#606266]'
          "
          @click="store.descSize = size"
        >
          <div
            :class="['h-6 w-6', 'h-5 w-5', 'h-4 w-4', 'h-3 w-3'][Math.min(index, 3)] || 'h-4 w-4'"
          >
            <img src="@/assets/svg/size-title.svg" alt="描述大小" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, computed, type Ref } from 'vue';
import type { SurveyItem } from '@/stores/survey';

const store = inject<Ref<SurveyItem>>('activeStore')!;
const titleSizes = computed(() => store.value.titleSizes || [22, 20, 18]);
const descSizes = computed(() => store.value.descSizes || [16, 14, 12]);
</script>
