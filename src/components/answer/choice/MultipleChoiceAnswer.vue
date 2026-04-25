<script setup lang="ts">
import { computed } from 'vue';
import MultipleChoice from '@/components/survey/choice/MultipleChoice.vue';

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  answer: {
    type: [String, Array],
    default: () => [],
  },
  questionIndex: {
    type: Number,
    default: undefined,
  },
  statistics: {
    type: Object as () => Record<string, { count: number; percent: number }> | null,
    default: null,
  },
});

const dataWithAnswer = computed(() => {
  // 确保多选题的 answer 是数组，这样 checkbox-group 才能正确绑定
  const answerArray = Array.isArray(props.answer)
    ? props.answer
    : (props.answer ? [props.answer] : []);

  return {
    ...props.data,
    answer: answerArray,
  };
});
</script>

<template>
  <div class="relative">
    <div class="pointer-events-none">
      <MultipleChoice :data="dataWithAnswer" :question-index="questionIndex" />
    </div>

    <!-- 显示统计数据（如果提供了统计数据） -->
    <div v-if="statistics" class="mt-4 rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-800">
      <div class="font-bold mb-2">统计数据：</div>
      <div v-for="(stat, option) in statistics" :key="option" class="mb-1 last:mb-0">
        <div class="flex items-center justify-between">
          <span class="font-medium">{{ option }}</span>
          <span>{{ stat.count }}次选择 ({{ stat.percent }}%)</span>
        </div>
        <div class="mt-1 h-2 w-full overflow-hidden rounded-full bg-green-100">
          <div
            class="h-full bg-green-500 transition-all duration-300"
            :style="{ width: stat.percent + '%' }"
          ></div>
        </div>
      </div>
    </div>

    <!-- 显示单个回答（如果没有统计数据） -->
    <div v-else class="mt-4 rounded-md border border-blue-200 bg-blue-50 p-3 text-sm text-blue-800">
      <span class="font-bold">用户的回答：</span>
      <span class="ml-2">{{ Array.isArray(answer) ? answer.join(', ') : answer || '未作答' }}</span>
    </div>
  </div>
</template>
