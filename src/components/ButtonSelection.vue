<script lang="ts" setup>
import { inject, ref, onMounted } from 'vue';

const props = defineProps({
  data: { type: Array<{ id: string; name: string }>, required: true },
});

const activeComponentContext = inject<{ setComponent: (cmp: unknown, name?: string) => void }>(
  'activeComponent',
);
const componentMap = inject<Record<string, unknown>>('componentMap');

const activeId = ref<string>('');

const handleClick = (item: { id: string; name: string }) => {
  activeId.value = item.id;
  if (activeComponentContext && componentMap && componentMap[item.name]) {
    activeComponentContext.setComponent(componentMap[item.name], item.name);
  }
};

onMounted(() => {
  if (props.data && props.data.length > 0) {
    handleClick(props.data[0]!);
  }
});
</script>

<template>
  <div class="grid grid-cols-2 gap-3">
    <el-button
      class="ml-0! w-full"
      v-for="item in data"
      :key="item.id"
      :type="activeId === item.id ? 'primary' : 'default'"
      @click="handleClick(item)"
    >
      {{ item.name }}
    </el-button>
  </div>
</template>
