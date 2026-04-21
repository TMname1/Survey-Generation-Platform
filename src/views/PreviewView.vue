<script setup lang="ts">
import { ref, onMounted, computed, provide } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getSurvey } from '@/apis/getSurvey';
import { Loading } from '@element-plus/icons-vue';
import type { SurveyItem } from '@/stores/survey';
import type { databaseSurveyType } from '@/apis/updateSurvey';

// Import components
import SingleChoice from '@/components/choice/SingleChoice.vue';
import MultipleChoice from '@/components/choice/MultipleChoice.vue';
import DropdownChoice from '@/components/choice/DropdownChoice.vue';
import RateComponent from '@/components/advanced/RateComponent.vue';
import DateComponent from '@/components/advanced/DateComponent.vue';
import TextInput from '@/components/input/textInput.vue';
import TitleComponent from '@/components/remarks/TitleComponent.vue';
import ParagraphComponent from '@/components/remarks/ParagraphComponent.vue';

const route = useRoute();
const router = useRouter();

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

// Provide the componentMap just in case any child needs it
provide('componentMap', componentMap);

const surveyTitle = ref('');
const surveyItems = ref<SurveyItem[]>([]);
const loading = ref(true);

onMounted(async () => {
  const username = localStorage.getItem('username') as string;
  const token = localStorage.getItem('token') as string;

  if (!username || !token) {
    loading.value = false;
    return;
  }

  try {
    const res: databaseSurveyType[] = await getSurvey(username, token);
    const id = route.params.id as string;

    const surveyData = res.find((s: databaseSurveyType) => {
      const lastItem = s[s.length - 1] as Record<string, unknown>;
      return lastItem && lastItem.uuid === id;
    });

    if (surveyData) {
      const lastItem = surveyData[surveyData.length - 1] as Record<string, unknown>;
      surveyTitle.value = (lastItem.surveyTitle as string) || '';

      surveyItems.value = surveyData.slice(0, surveyData.length - 1) as SurveyItem[];
    }
  } catch (error) {
    console.error('Failed to load survey:', error);
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
</script>

<template>
  <div class="min-h-screen bg-slate-50 py-10 px-4 flex flex-col items-center">
    <!-- Top Bar -->
    <div class="w-full max-w-4xl flex justify-between items-center mb-6 no-print">
      <div class="flex gap-3">
        <el-button @click="router.back()">返回</el-button>
        <el-button type="success">生成在线问卷</el-button>
        <!-- <el-button type="warning" @click="generatePdf">生成本地PDF</el-button> -->
      </div>
      <div class="text-slate-500 text-sm">
        题目数量：{{ Object.keys(questionIndices).length }}
      </div>
    </div>

    <!-- Survey Container -->
    <div class="w-full max-w-4xl bg-white rounded-lg shadow-sm overflow-hidden mb-8 p-10 pb-16 print-area">

      <div v-if="!loading && surveyItems.length > 0" class="flex flex-col gap-6">
        <div
          v-for="item in surveyItems"
          :key="item?.id"
          class="relative p-2"
        >
          <component
            :is="componentMap[item?.type as string]"
            :data="item"
            :question-index="questionIndices[item?.id as number]"
          />
        </div>
      </div>

      <!-- Loading State -->
      <div v-else-if="loading" class="p-20 flex justify-center items-center">
        <el-icon class="is-loading text-3xl text-primary"><Loading /></el-icon>
        <span class="ml-3 text-slate-500">正在加载问卷内容...</span>
      </div>

      <!-- Empty State -->
      <div v-else class="p-20 text-center text-slate-500">
        暂无问卷内容
      </div>
    </div>
  </div>
</template>

<style scoped>
@media print {
  .no-print {
    display: none !important;
  }
  .print-only {
    display: block !important;
  }
  .print-area {
    margin: 0 !important;
    padding: 0 !important;
    box-shadow: none !important;
    border: none !important;
  }
}
</style>
