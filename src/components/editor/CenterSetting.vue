<script setup lang="ts">
import { inject, type Ref } from 'vue';
import type { useSingleChoiceStore } from '@/stores/choice/singleChoice';

type ActiveStore = ReturnType<typeof useSingleChoiceStore>;

const store = inject<Ref<ActiveStore>>('activeStore')!;
</script>

<template>
  <div class="flex items-center justify-start gap-4">
    <div class="text-[14px] text-[#606266]">对齐方式</div>
    <div class="w-12 text-[12px] text-[#909399]" v-if="store.position">{{ store.position }}</div>
    <el-radio-group v-model="store.position">
      <el-radio-button value="左对齐" label="左对齐">
        <div class="h-4 w-4"><img src="@/assets/svg/align-left.svg" alt="左对齐" /></div>
      </el-radio-button>
      <el-radio-button value="居中对齐" label="居中对齐">
        <div class="h-4 w-4"><img src="@/assets/svg/align-center.svg" alt="居中对齐" /></div>
      </el-radio-button>
    </el-radio-group>
  </div>
</template>
