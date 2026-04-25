<script setup lang="ts">
import { ref, onMounted, computed, provide } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getSurvey } from '@/apis/getSurvey';
import { getAnswer } from '@/apis/getAnswer';
import { ElMessage } from 'element-plus';
import { Loading } from '@element-plus/icons-vue';
import type { SurveyItem } from '@/stores/survey';
import type { databaseSurveyType } from '@/apis/updateSurvey';
import { calculateAllQuestionStats } from '@/utils/statistics';

// Import answer components
import SingleChoiceAnswer from '@/components/answer/choice/SingleChoiceAnswer.vue';
import MultipleChoiceAnswer from '@/components/answer/choice/MultipleChoiceAnswer.vue';
import DropdownChoiceAnswer from '@/components/answer/choice/DropdownChoiceAnswer.vue';

// Import other components
import RateComponent from '@/components/advanced/RateComponent.vue';
import DateComponent from '@/components/advanced/DateComponent.vue';
import TextInput from '@/components/input/textInput.vue';
import TitleComponent from '@/components/remarks/TitleComponent.vue';
import ParagraphComponent from '@/components/remarks/ParagraphComponent.vue';

const route = useRoute();
const router = useRouter();

const componentMap: Record<string, unknown> = {
  单选题: SingleChoiceAnswer,
  多选题: MultipleChoiceAnswer,
  下拉选择题: DropdownChoiceAnswer,
  评价: RateComponent,
  日期: DateComponent,
  文本输入: TextInput,
  备注标题: TitleComponent,
  备注段落: ParagraphComponent,
};

// Provide the componentMap just in case any child needs it
provide('componentMap', componentMap);

const surveyTitle = ref('');
const surveyItems = ref<SurveyItem[]>([]);
const loading = ref(true);
const surveyAnswers = ref<unknown[][]>([]);

onMounted(async () => {
  const username = localStorage.getItem('username') as string;
  const token = localStorage.getItem('token') as string;
  const id = route.params.id as string;

  if (!username || !token) {
    ElMessage.error('请先登录');
    loading.value = false;
    return;
  }

  try {
    // 1. Fetch survey structure
    const res: databaseSurveyType[] = await getSurvey(username, token);

    const surveyData = res.find((s: databaseSurveyType) => {
      const lastItem = s[s.length - 1] as Record<string, unknown>;
      return lastItem && lastItem.uuid === id;
    });

    if (surveyData) {
      const lastItem = surveyData[surveyData.length - 1] as Record<string, unknown>;
      surveyTitle.value = (lastItem.surveyTitle as string) || '';
      surveyItems.value = surveyData.slice(0, surveyData.length - 1) as SurveyItem[];
    } else {
      ElMessage.error('找不到对应的问卷');
    }

    // 2. Fetch answers
    const answerRes = await getAnswer(id);

    if (answerRes && answerRes.ok && answerRes.data.survey) {
      surveyAnswers.value = answerRes.data.survey;
    }
  } catch (error) {
    console.error('Failed to load survey or answers:', error);
    ElMessage.error('加载问卷数据失败');
  } finally {
    loading.value = false;
  }
});

const remarkTypes = ['备注标题', '备注段落'];

// 计算每个组件的序号（只给非备注组件编号）
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

// 计算所有问题的统计数据
const questionStatistics = computed(() => {
  return calculateAllQuestionStats(surveyAnswers.value, surveyItems.value);
});


</script>

<template>
  <div class="data-view-container flex min-h-screen flex-col items-center px-4 py-10">
    <!-- Top Bar -->
    <div class="mb-6 flex w-full max-w-4xl items-center justify-between">
      <div class="flex gap-3">
        <el-button @click="router.back()">返回</el-button>
      </div>
      <div class="flex flex-col items-center">
        <div class="text-xl font-bold text-slate-800">{{ surveyTitle }} - 数据收集</div>
        <div class="mt-2 text-sm text-slate-600">
          统计数据视图
        </div>
      </div>
      <div class="text-sm text-slate-500">
        答卷数量：<span class="font-bold text-blue-600">{{ surveyAnswers.length }}</span> 份
      </div>
    </div>

    <!-- Survey Container -->
    <div class="w-full max-w-2xl overflow-hidden rounded-lg bg-white p-10 pb-16 shadow-sm">
      <div v-if="!loading && surveyAnswers.length > 0" class="flex flex-col gap-6">
        <!-- Survey Items -->
        <div v-for="(item, index) in surveyItems" :key="item?.id" class="relative p-2">
          <component
            :is="componentMap[item?.type as string]"
            :data="item"
            :question-index="questionIndices[item?.id as number]"
            :statistics="questionStatistics[index]"
          />
        </div>
      </div>

      <!-- Loading State -->
      <div v-else-if="loading" class="flex items-center justify-center p-20">
        <el-icon class="is-loading text-primary text-3xl">
          <Loading />
        </el-icon>
        <span class="ml-3 text-slate-500">正在加载数据...</span>
      </div>

      <!-- Empty State -->
      <div v-else class="p-20 text-center text-slate-500">
        <el-empty description="暂无用户提交的答卷" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.data-view-container {
  background-color: #f3f4f6;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}
</style>
