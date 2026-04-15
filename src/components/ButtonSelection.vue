<script lang="ts" setup>
import { inject, ref } from 'vue';
import { useDataStore } from '@/stores/index.ts';

defineProps({
  data: { type: Array<{ id: string; name: string }>, required: true },
});

const activeComponentContext = inject<{ setComponent: (cmp: unknown, name?: string) => void }>(
  'activeComponent',
);
const componentMap = inject<Record<string, unknown>>('componentMap');

const activeId = ref<string>('');
const dataStore = useDataStore();

const handleClick = (item: { id: string; name: string }) => {
  activeId.value = item.id;

  if (item.name === '单选题') {
    dataStore.addSurvey(dataStore.createFn.createSingleChoiceStore, item.name);
  }
  if (item.name === '多选题') {
    dataStore.addSurvey(dataStore.createFn.createMultipleChoiceStore, item.name);
  }
  if (item.name === '下拉选择题') {
    dataStore.addSurvey(dataStore.createFn.createDropdownChoiceStore, item.name);
  }

  if (activeComponentContext && componentMap && componentMap[item.name]) {
    activeComponentContext.setComponent(componentMap[item.name], item.name);
  }
};
</script>

<template>
  <div class="grid grid-cols-2 gap-3">
    <el-button
      class="ml-0! w-full"
      v-for="item in data"
      :key="item.id"
      :type="activeId === item.id && $route.path !== '/editor' ? 'primary' : 'default'"
      @click="handleClick(item)"
    >
      {{ item.name }}
    </el-button>
  </div>
</template>
