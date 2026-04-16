<script setup lang="ts">
import { inject, type Ref } from 'vue';
import { Delete } from '@element-plus/icons-vue';
import type { SurveyItem } from '@/stores/survey.ts';

const store = inject<Ref<SurveyItem>>('activeStore')!;

const addOption = () => {
  if (!store.value.options) {
    store.value.options = [];
  }
  store.value.options.push(`新选项${store.value.options.length + 1}`);
  ElMessage({
    message: '添加成功',
    type: 'success',
  });
};

const removeOption = (index: number | string) => {
  index = Number(index);
  if (!store.value.options || store.value.options.length <= 2) {
    ElMessage.error('选项不能少于两个');
    return;
  }
  store.value.options.splice(index, 1);
  ElMessage.success('删除成功');
};
</script>

<template>
  <div class="flex flex-col gap-2.5" v-if="store.options">
    <div v-for="(option, index) in store.options" :key="index" class="flex items-center gap-2.5">
      <el-input v-model="store.options[index]" placeholder="请输入选项内容" />
      <el-button type="danger" circle plain @click="removeOption(index)">
        <el-icon><Delete /></el-icon>
      </el-button>
    </div>
    <el-button type="primary" plain class="mt-2.5" @click="addOption">添加选项</el-button>
  </div>
</template>
