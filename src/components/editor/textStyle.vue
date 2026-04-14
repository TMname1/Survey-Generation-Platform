<script setup lang="ts">
import { inject } from 'vue';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const activeStore = inject<any>('activeStore');
</script>

<template>
  <div class="flex items-center justify-start gap-6">
    <h1 class="text-sm text-black">文本类型</h1>
    <el-radio-group v-model="activeStore.style">
      <el-radio-button value="单行文本"
        ><div class="h-4 w-4"><img src="@/assets/svg/singleText.svg" alt="单行文本" /></div
      ></el-radio-button>
      <el-radio-button value="多行文本"
        ><div class="h-4 w-4"><img src="@/assets/svg/multipleText.svg" alt="多行文本" /></div
      ></el-radio-button>
    </el-radio-group>
  </div>
</template>
