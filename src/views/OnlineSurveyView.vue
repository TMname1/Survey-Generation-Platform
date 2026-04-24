<script setup lang="ts">
import { computed, onMounted, provide, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getSurvey } from '@/apis/getSurvey';
import { throttle } from '@/utils/throttle';
import type { SurveyItem } from '@/stores/survey';
import type { databaseSurveyType } from '@/apis/updateSurvey';

import SingleChoice from '@/components/choice/SingleChoice.vue';
import MultipleChoice from '@/components/choice/MultipleChoice.vue';
import DropdownChoice from '@/components/choice/DropdownChoice.vue';
import RateComponent from '@/components/advanced/RateComponent.vue';
import DateComponent from '@/components/advanced/DateComponent.vue';
import TextInput from '@/components/input/textInput.vue';
import TitleComponent from '@/components/remarks/TitleComponent.vue';
import ParagraphComponent from '@/components/remarks/ParagraphComponent.vue';
import { uploadAnswer } from '@/apis/uploadAnswer.ts';

const route = useRoute();

const componentMap: Record<string, unknown> = {
  单选题: SingleChoice,
  多选题: MultipleChoice,
  下拉选择题: DropdownChoice,
  评价: RateComponent,
  日期: DateComponent,
  文本输入: TextInput,
  备注标题: TitleComponent,
  备注段落: ParagraphComponent,
};

provide('componentMap', componentMap);

const surveyTitle = ref('');
const surveyUuid = ref('');
const surveyItems = ref<SurveyItem[]>([]);
const loading = ref(true);
const submitted = ref(false);
const isSubmitting = ref(false);

const remarkTypes = ['备注标题', '备注段落'];

const questionIndices = computed(() => {
  const indices: Record<number, number> = {};
  let questionCount = 0;

  surveyItems.value.forEach((item) => {
    if (!remarkTypes.includes(item.type)) {
      questionCount++;
      indices[item.id] = questionCount;
    }
  });

  return indices;
});

export type surveyAnswerType = {
  surveyTitle: string;
  uuid: string;
  survey: SurveyItem[];
};


// TODO: 不是所有属性都需要传的
// TODO: 想想如何渲染数据
const uploadSurveyAnswer = throttle(async (data: surveyAnswerType) => {
  isSubmitting.value = true;
  try {
    const res = await uploadAnswer(data.uuid, data.survey);

    // TODO: 数据决定好，记得把我删除了
    console.log('submitting', data);

    if (res.ok) {
      ElMessage.success('问卷提交成功！');
      submitted.value = true;
    } else {
      ElMessage.error(res.error);
    }
  } finally {
    isSubmitting.value = false;
  }
}, 1000);

const submitSurvey = () => {
  if (submitted.value) return;
  const data: surveyAnswerType = {
    surveyTitle: surveyTitle.value,
    uuid: surveyUuid.value,
    survey: surveyItems.value,
  };
  uploadSurveyAnswer(data);
};

onMounted(async () => {
  const id = route.params.id as string;
  const username = localStorage.getItem('username') || 'anonymous';
  const token = localStorage.getItem('token') || 'anonymous';

  try {
    const res: databaseSurveyType[] = await getSurvey(username, token);
    const surveyData = res.find((s: databaseSurveyType) => {
      const lastItem = s[s.length - 1] as Record<string, unknown>;
      return lastItem && lastItem.uuid === id;
    });

    if (surveyData) {
      const lastItem = surveyData[surveyData.length - 1] as Record<string, unknown>;
      surveyTitle.value = (lastItem.surveyTitle as string) || '';
      surveyUuid.value = (lastItem.uuid as string) || '';
      surveyItems.value = surveyData.slice(0, surveyData.length - 1) as SurveyItem[];
    }
  } catch (error) {
    console.error('Failed to load survey:', error);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="online-survey-container flex min-h-screen flex-col items-center px-4 py-10"
    v-loading.fullscreen.lock="isSubmitting" element-loading-text="正在提交...">
    <div class="mb-8 w-full max-w-2xl rounded-lg bg-white p-10 shadow-sm">
      <div v-if="submitted" class="py-20 text-center text-lg text-slate-600">
        感谢您的填写，问卷已提交
      </div>

      <div v-else-if="!loading && surveyItems.length > 0" class="flex flex-col gap-6">
        <div v-for="item in surveyItems" :key="item?.id" class="relative p-2">
          <component :is="componentMap[item?.type as string]" :data="item"
            :question-index="questionIndices[item?.id as number]" />
        </div>

        <div class="flex justify-center pt-4">
          <el-button type="primary" size="large" @click="submitSurvey">
            提交问卷
          </el-button>
        </div>
      </div>

      <div v-else-if="loading" class="flex items-center justify-center p-20">
        <el-icon class="is-loading text-primary text-3xl">
          <Loading />
        </el-icon>
        <span class="ml-3 text-slate-500">正在加载问卷内容...</span>
      </div>

      <div v-else class="p-20 text-center text-slate-500">暂无问卷内容</div>
    </div>
  </div>
</template>

<style scoped>
.online-survey-container {
  background-image: url('@/assets/preview_background.png');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}
</style>
