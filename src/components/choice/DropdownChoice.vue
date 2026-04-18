<script lang="ts" setup>
import { computed, ref } from 'vue';
import { ArrowDown } from '@element-plus/icons-vue';

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const containerStyle = computed(() => ({
  textAlign: props.data.position === '居中对齐' ? ('center' as const) : ('left' as const),
}));

const titleStyle = computed(() => ({
  fontSize: `${props.data.titleSize}px`,
  fontWeight: props.data.titleWeight === '加粗' ? 'bold' : 'normal',
  fontStyle: props.data.titleItalic === '斜体' ? 'italic' : 'normal',
  color: props.data.titleColor,
}));

const descStyle = computed(() => ({
  fontSize: `${props.data.descSize}px`,
  fontWeight: props.data.descWeight === '加粗' ? 'bold' : 'normal',
  color: props.data.descColor,
}));

const stageVal = ref('');

const handleCommand = (command: string) => {
  stageVal.value = command;
};
</script>
<template>
  <div :style="containerStyle" class="wrap-anywhere">
    <h1 class="mb-5" :style="titleStyle">{{ data.title }}</h1>
    <p class="mb-5" :style="descStyle">{{ data.desc }}</p>
    <el-dropdown @command="handleCommand">
      <el-button>
        {{ stageVal || '请选择选项' }}
        <el-icon class="el-icon--right"><ArrowDown /></el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="(opt, index) in data.options" :key="index" :command="opt">
            {{ opt }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
