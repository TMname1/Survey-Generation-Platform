<template>
  <div class="mb-5">
    <div class="mb-2 flex items-center justify-between">
      <div class="text-[14px] text-[#606266]">标题大小</div>
      <div class="text-[14px] text-[#909399]">{{ store.titleSize }}px</div>
      <div class="flex gap-2">
        <div
          class="flex cursor-pointer items-center justify-center gap-1 rounded-sm border px-3 py-1.5 transition-all duration-300 hover:border-[#c6e2ff] hover:bg-[#ecf5ff] hover:text-[#409eff]"
          :class="
            store.titleSize === 22
              ? 'border-[#409eff] bg-[#ecf5ff] text-[#409eff]'
              : 'border-[#dcdfe6] text-[#606266]'
          "
          @click="store.titleSize = 22"
        >
          <div class="h-6 w-6"><img src="@/assets/svg/size-title.svg" alt="标题大小" /></div>
        </div>
        <div
          class="flex cursor-pointer items-center justify-center gap-1 rounded-sm border px-3 py-1.5 transition-all duration-300 hover:border-[#c6e2ff] hover:bg-[#ecf5ff] hover:text-[#409eff]"
          :class="
            store.titleSize === 20
              ? 'border-[#409eff] bg-[#ecf5ff] text-[#409eff]'
              : 'border-[#dcdfe6] text-[#606266]'
          "
          @click="store.titleSize = 20"
        >
          <div class="h-5 w-5"><img src="@/assets/svg/size-title.svg" alt="标题大小" /></div>
        </div>
        <div
          class="flex cursor-pointer items-center justify-center gap-1 rounded-sm border px-3 py-1.5 transition-all duration-300 hover:border-[#c6e2ff] hover:bg-[#ecf5ff] hover:text-[#409eff]"
          :class="
            store.titleSize === 18
              ? 'border-[#409eff] bg-[#ecf5ff] text-[#409eff]'
              : 'border-[#dcdfe6] text-[#606266]'
          "
          @click="store.titleSize = 18"
        >
          <div class="h-4 w-4"><img src="@/assets/svg/size-title.svg" alt="标题大小" /></div>
        </div>
      </div>
    </div>
  </div>
  <div class="mb-5">
    <div class="mb-2 flex items-center justify-between">
      <div class="text-[14px] text-[#606266]">描述大小</div>
      <div class="text-[14px] text-[#909399]">{{ store.descSize }}px</div>
      <div class="flex gap-2">
        <div
          class="flex cursor-pointer items-center rounded-sm border px-3 py-1.5 transition-all duration-300 hover:border-[#c6e2ff] hover:bg-[#ecf5ff] hover:text-[#409eff]"
          :class="
            store.descSize === 16
              ? 'border-[#409eff] bg-[#ecf5ff] text-[#409eff]'
              : 'border-[#dcdfe6] text-[#606266]'
          "
          @click="store.descSize = 16"
        >
          <div class="h-6 w-6"><img src="@/assets/svg/size-title.svg" alt="描述大小" /></div>
        </div>
        <div
          class="flex cursor-pointer items-center rounded-sm border px-3 py-1.5 transition-all duration-300 hover:border-[#c6e2ff] hover:bg-[#ecf5ff] hover:text-[#409eff]"
          :class="
            store.descSize === 14
              ? 'border-[#409eff] bg-[#ecf5ff] text-[#409eff]'
              : 'border-[#dcdfe6] text-[#606266]'
          "
          @click="store.descSize = 14"
        >
          <div class="h-5 w-5"><img src="@/assets/svg/size-title.svg" alt="描述大小" /></div>
        </div>
        <div
          class="flex cursor-pointer items-center rounded-sm border px-3 py-1.5 transition-all duration-300 hover:border-[#c6e2ff] hover:bg-[#ecf5ff] hover:text-[#409eff]"
          :class="
            store.descSize === 12
              ? 'border-[#409eff] bg-[#ecf5ff] text-[#409eff]'
              : 'border-[#dcdfe6] text-[#606266]'
          "
          @click="store.descSize = 12"
        >
          <div class="h-4 w-4"><img src="@/assets/svg/size-title.svg" alt="描述大小" /></div>
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
