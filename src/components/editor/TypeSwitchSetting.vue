<template>
  <div class="mb-5">
    <div class="mb-2 flex items-center justify-between">
      <div class="text-[14px] text-[#606266]">说明内容</div>
      <div class="text-[14px] text-[#909399]">
        {{ store.remarkType === 'title' ? '标题' : '段落' }}
      </div>
      <div class="flex gap-2">
        <div
          class="flex cursor-pointer items-center justify-center gap-1 rounded-sm border px-3 py-1.5 transition-all duration-300 hover:border-[#c6e2ff] hover:bg-[#ecf5ff] hover:text-[#409eff]"
          :class="
            store.remarkType === 'title'
              ? 'border-[#409eff] bg-[#ecf5ff] text-[#409eff]'
              : 'border-[#dcdfe6] text-[#606266]'
          "
          @click="
            store.remarkType = 'title';
            store.position = '居中对齐';
            store.editComponents = store.editComponents!.map((c) =>
              c === 'DescSetting' ? 'TitleSetting' : c,
            );
          "
        >
          <div class="h-4 w-4"><img src="@/assets/svg/title.svg" alt="标题" /></div>
        </div>
        <div
          class="flex cursor-pointer items-center justify-center gap-1 rounded-sm border px-3 py-1.5 transition-all duration-300 hover:border-[#c6e2ff] hover:bg-[#ecf5ff] hover:text-[#409eff]"
          :class="
            store.remarkType === 'paragraph'
              ? 'border-[#409eff] bg-[#ecf5ff] text-[#409eff]'
              : 'border-[#dcdfe6] text-[#606266]'
          "
          @click="
            store.remarkType = 'paragraph';
            store.position = '左对齐';
            store.editComponents = store.editComponents!.map((c) =>
              c === 'TitleSetting' ? 'DescSetting' : c,
            );
          "
        >
          <div class="h-4 w-4"><img src="@/assets/svg/paragraph.svg" alt="段落" /></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, type Ref } from 'vue';
import type { SurveyItem } from '@/stores/survey';

const store = inject<Ref<SurveyItem>>('activeStore')!;
</script>
