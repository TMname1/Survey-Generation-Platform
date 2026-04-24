<script setup lang="ts">
import { computed } from 'vue';
import DropdownChoice from '../choice/DropdownChoice.vue';

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  answer: {
    type: [String, Array],
    default: '',
  },
  questionIndex: {
    type: Number,
    default: undefined,
  },
});

const dataWithAnswer = computed(() => {
  return {
    ...props.data,
    answer: props.answer,
  };
});
</script>

<template>
  <div class="relative">
    <div class="pointer-events-none">
      <DropdownChoice :data="dataWithAnswer" :question-index="questionIndex" />
    </div>
    <div class="mt-4 rounded-md bg-blue-50 p-3 text-sm text-blue-800 border border-blue-200">
      <span class="font-bold">用户的回答：</span>
      <span class="ml-2">{{ Array.isArray(answer) ? answer.join(', ') : answer || '未作答' }}</span>
    </div>
  </div>
</template>
