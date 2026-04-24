<script setup lang="ts">
import { computed } from 'vue';
import MultipleChoice from '../choice/MultipleChoice.vue';

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
    <div class="mt-4 rounded-md bg-blue-50 p-3 text-sm text-blue-800 border border-blue-200">
      <span class="font-bold">用户的回答：</span>
      <span class="ml-2">{{ Array.isArray(answer) ? answer.join(', ') : answer || '未作答' }}</span>
    </div>
  </div>
</template>
