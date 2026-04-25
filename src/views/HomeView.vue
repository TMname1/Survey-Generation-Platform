<script setup lang="ts">
import { Edit, Plus } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import LoginComponent from '@/components/LoginComponent.vue';
import { getSurvey } from '@/apis/getSurvey.ts';
import { onBeforeMount, ref, watch } from 'vue';
import type { databaseSurveyType } from '@/apis/updateSurvey.ts';
import { useUserStore } from '@/stores/user';
import { useDataStore } from '@/stores/survey.ts';
import { deleteSurvey } from '@/apis/deleteSurvey.ts';
import { throttle } from '@/utils/throttle.ts';
import { getAnswer } from '@/apis/getAnswer.ts';
import { deleteAnswer } from '@/apis/deleteAnswer.ts';

const router = useRouter();
const userStore = useUserStore();

type tableDataType = {
  createDate: string;
  title: string;
  questionCount: number;
  updateDate: string;
  uuid: string;
};

const tableData = ref();
const loading = ref(true);
const remarkTypes = ['备注标题', '备注段落'];
const isSurveyQuestion = (item: databaseSurveyType[number]) =>
  'type' in item && !remarkTypes.includes(item.type);

const renderTableData = async () => {
  const username = localStorage.getItem('username') as string;
  const authorization = localStorage.getItem('token') as string;

  if (!username || !authorization) {
    tableData.value = [];
    loading.value = false;
    return;
  }

  try {
    loading.value = true;
    const res = await getSurvey(username, authorization);
    tableData.value = res.map((survey: databaseSurveyType) => {
      const lastIdx = survey.length - 1;
      const questionCount = survey.filter(isSurveyQuestion).length;

      return {
        createDate: survey[lastIdx]?.createDate,
        title: survey[lastIdx]?.surveyTitle,
        questionCount,
        updateDate: survey[lastIdx]?.updateDate,
        uuid: survey[lastIdx]?.uuid,
      };
    });
  } catch (error) {
    console.error('Failed to load survey data:', error);
    ElMessage({
      message: '加载问卷列表失败，请重试',
      type: 'error',
    });
    tableData.value = [];
  } finally {
    loading.value = false;
  }
};

onBeforeMount(renderTableData);

watch(
  () => userStore.token,
  () => {
    renderTableData();
  },
);

const dataStore = useDataStore();

const editSurveyHandle = async (item: tableDataType) => {
  const username = localStorage.getItem('username') as string;
  const authorization = localStorage.getItem('token') as string;

  const res = await getSurvey(username, authorization);
  const editSurvey = res.find(
    (survey: databaseSurveyType) => survey[survey.length - 1]?.uuid === item.uuid,
  );

  dataStore.survey = editSurvey;
  dataStore.isUpdate = true;

  router.push('/editor');
};

const createSurveyHandle = () => {
  dataStore.initSurvey();
  dataStore.isUpdate = false;
  router.push('/editor');
};

const handleDeleteSurvey = throttle(async (item: tableDataType) => {
  try {
    const res = await Promise.all([
      deleteSurvey(localStorage.getItem('username') as string, item.uuid),
      deleteAnswer(item.uuid),
    ]);

    if (res) {
      ElMessage({
        message: '删除成功',
        type: 'success',
      });
      renderTableData();
    } else {
      ElMessage({
        message: '删除失败',
        type: 'error',
      });
    }
  } catch (err) {
    ElMessage({
      message: '删除失败',
      type: 'error',
    });
    console.error(err);
  }
});

const handleCheckAnswer = throttle(async (item: tableDataType) => {
  const res = await getAnswer(item.uuid);

  if (!res.ok) {
    ElMessage({
      message: '获取数据失败',
      type: 'error',
    });
    return;
  }
  router.push('/data/' + item.uuid);
});
</script>

<template>
  <div class="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
    <div class="mx-auto flex w-full max-w-6xl flex-col items-center gap-8">
      <h1 class="text-center text-3xl font-semibold tracking-wider text-slate-900">问卷系统</h1>

      <div class="flex w-full items-center justify-between">
        <div class="flex gap-4">
          <el-button type="primary" :icon="Plus" @click="createSurveyHandle">创建问卷</el-button>
          <el-button type="success" :icon="Edit" @click="router.push('/editorMaterials')">
            自定义组件
          </el-button>
        </div>
        <LoginComponent :gapVal="'gap-4'" />
      </div>

      <div class="w-full overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
        <el-table :data="tableData" v-loading="loading" class="w-full" border>
          <el-table-column prop="createDate" label="创建日期" min-width="140" />
          <el-table-column prop="title" label="问卷标题" min-width="220" />
          <el-table-column prop="questionCount" label="题目数" min-width="120" />
          <el-table-column prop="updateDate" label="最近更新日期" min-width="160" />
          <el-table-column label="操作" min-width="140">
            <template #default="scope">
              <div class="flex items-center gap-3">
                <el-link
                  type="primary"
                  underline="never"
                  @click="router.push('/preview/' + scope.row.uuid)"
                  >查看问卷</el-link
                >
                <el-link type="warning" underline="never" @click="editSurveyHandle(scope.row)"
                  >编辑</el-link
                >
                <el-link type="danger" underline="never" @click="handleDeleteSurvey(scope.row)"
                  >删除</el-link
                >
              </div>
            </template>
          </el-table-column>
          <el-table-column label="提交数据">
            <template #default="scope">
              <el-link type="success" underline="never" @click="handleCheckAnswer(scope.row)"
                >查看</el-link
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
