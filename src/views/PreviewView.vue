<script setup lang="ts">
import { ref, onMounted, computed, provide } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getSurvey } from '@/apis/getSurvey';
import { ElMessage } from 'element-plus';
import { Loading } from '@element-plus/icons-vue';
import type { SurveyItem } from '@/stores/survey';
import type { databaseSurveyType } from '@/apis/updateSurvey';

// Import components
import SingleChoice from '@/components/survey/choice/SingleChoice.vue';
import MultipleChoice from '@/components/survey/choice/MultipleChoice.vue';
import DropdownChoice from '@/components/survey/choice/DropdownChoice.vue';
import RateComponent from '@/components/survey/advanced/RateComponent.vue';
import DateComponent from '@/components/survey/advanced/DateComponent.vue';
import TextInput from '@/components/survey/input/textInput.vue';
import TitleComponent from '@/components/survey/remarks/TitleComponent.vue';
import ParagraphComponent from '@/components/survey/remarks/ParagraphComponent.vue';

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
const shareLink = `${window.location.origin}/online/${route.params.id}`;

const copyShareLink = async () => {
  await navigator.clipboard.writeText(shareLink);
  ElMessage.success('链接已复制到剪贴板，快去分享吧！');
};

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
  <div class="preview-container flex min-h-screen flex-col items-center px-4 py-10">
    <!-- Top Bar -->
    <div class="no-print mb-6 flex w-full max-w-4xl items-center justify-between">
      <div class="flex gap-3">
        <el-button @click="router.back()">返回</el-button>
        <el-button type="success" @click="copyShareLink">分享在线问卷</el-button>
        <!-- <el-button type="warning" @click="generatePdf">生成本地PDF</el-button> -->
      </div>
      <div class="text-sm text-slate-500">题目数量：{{ Object.keys(questionIndices).length }}</div>
    </div>

    <!-- Survey Container -->
    <div class="print-area mb-8 w-full max-w-2xl overflow-hidden rounded-lg bg-white p-10 pb-16 shadow-sm">
      <div v-if="!loading && surveyItems.length > 0" class="flex flex-col gap-6">
        <div v-for="item in surveyItems" :key="item?.id" class="relative p-2">
          <component :is="componentMap[item?.type as string]" :data="item"
            :question-index="questionIndices[item?.id as number]" />
        </div>
      </div>

      <!-- Loading State -->
      <div v-else-if="loading" class="flex items-center justify-center p-20">
        <el-icon class="is-loading text-primary text-3xl">
          <Loading />
        </el-icon>
        <span class="ml-3 text-slate-500">正在加载问卷内容...</span>
      </div>

      <!-- Empty State -->
      <div v-else class="p-20 text-center text-slate-500">暂无问卷内容</div>
    </div>
  </div>
</template>

<style scoped>
.preview-container {
  background-image: url('@/assets/preview_background.png');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}
</style>
