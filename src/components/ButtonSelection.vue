<script lang="ts" setup>
import { inject, ref } from 'vue';
import { useDataStore, type SurveyItem } from '@/stores/survey.ts';
import { useRoute } from 'vue-router';

defineProps({
  data: { type: Array<{ id: string; name: string }>, required: true },
});

const activeComponentContext = inject<{ setComponent: (cmp: unknown, name?: string) => void }>(
  'activeComponent',
);
const componentMap = inject<Record<string, unknown>>('componentMap');

const activeId = ref<string>('');
const dataStore = useDataStore();

const route = useRoute();

const handleClick = (item: { id: string; name: string }) => {
  activeId.value = item.id;
  let addedItem: SurveyItem | null = null;

  if (route.path === '/editor') {
    if (item.name === '单选题') {
      addedItem = dataStore.addSurvey(dataStore.createFn.createSingleChoiceStore, item.name);
    }
    if (item.name === '多选题') {
      addedItem = dataStore.addSurvey(dataStore.createFn.createMultipleChoiceStore, item.name);
    }
    if (item.name === '下拉选择题') {
      addedItem = dataStore.addSurvey(dataStore.createFn.createDropdownChoiceStore, item.name);
    }
    if (item.name === '评价') {
      addedItem = dataStore.addSurvey(dataStore.createFn.createRateStore, item.name);
    }
    if (item.name === '日期') {
      addedItem = dataStore.addSurvey(dataStore.createFn.createDateStore, item.name);
    }
    if (item.name === '文本输入') {
      addedItem = dataStore.addSurvey(dataStore.createFn.createTextInputStore, item.name);
    }
    if (item.name === '备注标题') {
      addedItem = dataStore.addSurvey(dataStore.createFn.createRemarkTitleStore, '备注标题');
    }
    if (item.name === '备注段落') {
      addedItem = dataStore.addSurvey(dataStore.createFn.createRemarkCTXStore, '备注段落');
    }

    if (addedItem) {
      const id = addedItem.id;
      setTimeout(() => {
        const el = document.getElementById(`survey-item-${id}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
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
