<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useDropdownChoiceStore } from '@/stores/choice/dropdownChoice';
import { ArrowDown } from '@element-plus/icons-vue';

const store = useDropdownChoiceStore();

const containerStyle = computed(() => ({
  textAlign: store.position === '居中对齐' ? ('center' as const) : ('left' as const),
}));

const titleStyle = computed(() => ({
  fontSize: `${store.titleSize}px`,
  fontWeight: store.titleWeight === '加粗' ? 'bold' : 'normal',
  fontStyle: store.titleItalic === '斜体' ? 'italic' : 'normal',
  color: store.titleColor,
}));

const descStyle = computed(() => ({
  fontSize: `${store.descSize}px`,
  fontWeight: store.descWeight === '加粗' ? 'bold' : 'normal',
  color: store.descColor,
}));

const stageVal = ref('');

const handleCommand = (command: string) => {
  stageVal.value = command;
};
</script>
<template>
  <div :style="containerStyle">
    <h1 class="mb-5" :style="titleStyle">{{ store.title }}</h1>
    <p class="mb-5" :style="descStyle">{{ store.desc }}</p>
    <el-dropdown @command="handleCommand">
      <el-button>
        {{ stageVal || '请选择选项' }}
        <el-icon class="el-icon--right"><ArrowDown /></el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="(opt, index) in store.options" :key="index" :command="opt">
            {{ opt }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
