<script setup lang="ts">
import { inject, type Ref } from 'vue';
import type { useSingleChoiceStore } from '@/stores/choice/singleChoice';

type ActiveStore = ReturnType<typeof useSingleChoiceStore>;
import { Delete } from '@element-plus/icons-vue';

const store = inject<Ref<ActiveStore>>('activeStore')!;

const addOption = () => {
  store.value.options.push(`新选项${store.value.options.length + 1}`);
  ElMessage({
    message: '添加成功',
    type: 'success',
  });
};

const removeOption = (index: number) => {
  if (store.value.options.length <= 2) {
    ElMessage.error('选项不能少于两个');
    return;
  }
  store.value.options.splice(index, 1);
  ElMessage.success('删除成功');
};
</script>

<template>
  <div class="flex flex-col gap-2.5">
    <div v-for="(option, index) in store.options" :key="index" class="flex items-center gap-2.5">
      <el-input v-model="store.options[index]" placeholder="请输入选项内容" />
      <el-button type="danger" circle plain @click="removeOption(index)">
        <el-icon><Delete /></el-icon>
      </el-button>
    </div>
    <el-button type="primary" plain class="mt-2.5" @click="addOption">添加选项</el-button>
  </div>
</template>
