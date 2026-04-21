<script setup lang="ts">
import { Edit, Plus } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import LoginComponent from '@/components/LoginComponent.vue';
import { getSurvey } from '@/apis/getSurvey.ts';
import { onBeforeMount, ref } from 'vue';
import type { databaseSurveyType } from '@/apis/updateSurvey.ts';

const router = useRouter();

const tableData = ref();
onBeforeMount(async () => {
  const username = localStorage.getItem('username') as string;
  const authorization = localStorage.getItem('token') as string;

  if (!username || !authorization) return;

  const res = await getSurvey(username, authorization);
  tableData.value = res.map((survey: databaseSurveyType) => {
    const lastIdx = survey.length - 1;
    return {
      createDate: survey[lastIdx]?.createDate,
      title: survey[lastIdx]?.title,
      // FIXME: 它会把备注说明，这种不是题目也计算上
      questionCount: survey.length - 1,
      updateDate: survey[lastIdx]?.updateDate,
    };
  });
});
</script>

<template>
  <div class="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
    <div class="mx-auto flex w-full max-w-6xl flex-col items-center gap-8">
      <h1 class="text-center text-3xl font-semibold tracking-wider text-slate-900">问卷系统</h1>

      <div class="flex w-full items-center justify-between">
        <div class="flex gap-4">
          <el-button type="primary" :icon="Plus" @click="router.push('/editor')"
            >创建问卷</el-button
          >
          <el-button type="success" :icon="Edit" @click="router.push('/editorMaterials')">
            自定义组件
          </el-button>
        </div>
        <LoginComponent :gapVal="'gap-4'" />
      </div>

      <div class="w-full overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
        <el-table :data="tableData" class="w-full" border>
          <el-table-column prop="createDate" label="创建日期" min-width="140" />
          <el-table-column prop="title" label="问卷标题" min-width="220" />
          <el-table-column prop="questionCount" label="题目数" min-width="120" />
          <el-table-column prop="updateDate" label="最近更新日期" min-width="160" />
          <el-table-column label="操作" min-width="140">
            <template #default>
              <div class="flex items-center gap-3">
                <el-link type="primary" underline="never">查看问卷</el-link>
                <el-link type="warning" underline="never">编辑</el-link>
                <el-link type="danger" underline="never">删除</el-link>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
