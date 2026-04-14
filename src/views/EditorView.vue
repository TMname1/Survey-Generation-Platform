<script setup lang="ts">
import { provide, shallowRef, ref, computed } from 'vue';
import router from '@/router/index.ts';
import {
  ArrowLeft,
  CircleCheck,
  EditPen,
  MessageBox,
  ChatLineSquare,
  User,
  Message,
} from '@element-plus/icons-vue';

// Import stores
import { useSingleChoiceStore } from '@/stores/choice/singleChoice';
import { useMultipleChoiceStore } from '@/stores/choice/multipleChoice';
import { useDropdownChoiceStore } from '@/stores/choice/dropdownChoice';
import { useRateStore } from '@/stores/advanced/rate';
import { useDateStore } from '@/stores/advanced/date';
import { useTextInputStore } from '@/stores/input/textInput';

// Import components
import ButtonSelection from '@/components/ButtonSelection.vue';
import SingleChoice from '@/components/choice/SingleChoice.vue';
import MultipleChoice from '@/components/choice/MultipleChoice.vue';
import DropdownChoice from '@/components/choice/DropdownChoice.vue';
import RateComponent from '@/components/advanced/RateComponent.vue';
import DateComponent from '@/components/advanced/DateComponent.vue';
import TextInput from '@/components/input/textInput.vue';

// Import edit components
import BoldSetting from '@/components/editor/BoldSetting.vue';
import CenterSetting from '@/components/editor/CenterSetting.vue';
import ColorSetting from '@/components/editor/ColorSetting.vue';
import ItalicSetting from '@/components/editor/ItalicSetting.vue';
import RadioOption from '@/components/editor/RadioOption.vue';
import SizeSetting from '@/components/editor/SizeSetting.vue';
import TextStyle from '@/components/editor/textStyle.vue';

import TitleSetting from '@/views/materials/TitleSetting.vue';
import DescSetting from '@/views/materials/DescSetting.vue';

const activeComponent = shallowRef<unknown>(null);
const activeComponentName = ref<string>('');

provide('activeComponent', {
  setComponent: (cmp: unknown, name?: string) => {
    activeComponent.value = cmp;
    if (name) {
      activeComponentName.value = name;
    }
  },
});

const componentMap: Record<string, unknown> = {
  单选题: SingleChoice,
  多选题: MultipleChoice,
  下拉选择题: DropdownChoice,
  评价: RateComponent,
  日期: DateComponent,
  文本输入: TextInput,
};

provide('componentMap', componentMap);

const singleChoiceStore = useSingleChoiceStore();

const multipleChoiceStore = useMultipleChoiceStore();
const dropdownChoiceStore = useDropdownChoiceStore();
const rateStore = useRateStore();
const dateStore = useDateStore();
const textInputStore = useTextInputStore();

const activeStore = computed(() => {
  if (activeComponentName.value === '单选题') {
    return singleChoiceStore;
  }
  if (activeComponentName.value === '多选题') {
    return multipleChoiceStore;
  }
  if (activeComponentName.value === '下拉选择题') {
    return dropdownChoiceStore;
  }
  if (activeComponentName.value === '评价') {
    return rateStore;
  }
  if (activeComponentName.value === '日期') {
    return dateStore;
  }
  if (activeComponentName.value === '文本输入') {
    return textInputStore;
  }
  return null;
});

provide('activeStore', activeStore);

const editComponentsMap: Record<string, unknown> = {
  textStyle: TextStyle,
  TitleSetting,
  DescSetting,
  RadioOption,
  SizeSetting,
  ColorSetting,
  BoldSetting,
  ItalicSetting,
  CenterSetting,
};

const selectionBtnData = [
  { id: '单选题', name: '单选题' },
  { id: '多选题', name: '多选题' },
  { id: '下拉选择题', name: '下拉选择题' },
];

const textInputBtnData = [{ id: '文本输入', name: '文本输入' }];

const advancedBtnData = [
  { id: '评价', name: '评价' },
  { id: '日期', name: '日期' },
];

const remarkBtnData = [{ id: '备注说明', name: '备注说明' }];

const personalInfoBtnData = [
  { id: '姓名', name: '姓名' },
  { id: '身份证', name: '身份证' },
  { id: '出生日期', name: '出生日期' },
  { id: '性别', name: '性别' },
  { id: '年龄', name: '年龄' },
  { id: '学历', name: '学历' },
  { id: '大学', name: '大学' },
  { id: '专业', name: '专业' },
];

const contactBtnData = [
  { id: '手机', name: '手机' },
  { id: '微信', name: '微信' },
  { id: 'QQ', name: 'QQ' },
  { id: '邮箱', name: '邮箱' },
];
</script>

<template>
  <nav class="flex h-16 items-center justify-between border-b border-gray-300 bg-white">
    <div class="flex h-full items-center gap-4">
      <div class="flex h-full w-16 items-center justify-center border-r border-gray-300">
        <el-button class="h-10! w-10!" :icon="ArrowLeft" circle @click="router.push('/')" />
      </div>
      <div>
        <el-button type="danger">重置问题</el-button>
        <el-button type="success">保存问卷</el-button>
      </div>
    </div>
    <div class="flex h-full w-16 items-center justify-center border-l border-gray-300">
      <el-avatar
        class="border-2 border-white shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-transform duration-500 hover:rotate-360"
        :size="42"
        src="https://avatars.githubusercontent.com/u/84985340"
      />
    </div>
  </nav>

  <main class="flex h-[calc(100vh-4rem)] bg-gray-50 text-gray-800">
    <aside>
      <div class="flex w-16 flex-col items-center border-r border-gray-100 pt-5">
        <div class="mb-6 cursor-pointer text-center text-sm text-blue-500">📄<br />题型</div>
        <div class="mb-6 cursor-pointer text-center text-sm text-gray-500">目<br />大纲</div>
      </div>
    </aside>
    <aside class="flex w-65 flex-col border-r border-gray-300 bg-white p-5">
      <div class="mb-5">
        <div class="mb-2.5 flex items-center text-sm font-bold">
          <el-icon class="mr-1"><CircleCheck /></el-icon> 选择
        </div>
        <ButtonSelection :data="selectionBtnData" />
      </div>
      <div class="mb-5">
        <div class="mb-2.5 flex items-center text-sm font-bold">
          <el-icon class="mr-1"><EditPen /></el-icon> 文本输入
        </div>
        <ButtonSelection :data="textInputBtnData" />
      </div>

      <div class="mb-5">
        <div class="mb-2.5 flex items-center text-sm font-bold">
          <el-icon class="mr-1"><MessageBox /></el-icon> 高级题型
        </div>
        <ButtonSelection :data="advancedBtnData" />
      </div>

      <div class="mb-5">
        <div class="mb-2.5 flex items-center text-sm font-bold">
          <el-icon class="mr-1"><ChatLineSquare /></el-icon> 备注说明
        </div>
        <ButtonSelection :data="remarkBtnData" />
      </div>

      <div class="mb-5">
        <div class="mb-2.5 flex items-center text-sm font-bold">
          <el-icon class="mr-1"><User /></el-icon> 个人信息
        </div>
        <ButtonSelection :data="personalInfoBtnData" />
      </div>
      <div class="mb-5">
        <div class="mb-2.5 flex items-center text-sm font-bold">
          <el-icon class="mr-1"><Message /></el-icon> 联系方式
        </div>
        <ButtonSelection :data="contactBtnData" />
      </div>
    </aside>

    <!-- 中间预览区 -->
    <section
      class="flex flex-1 flex-col items-center overflow-y-auto bg-linear-to-br from-blue-100 to-white p-10"
    >
      <div
        class="w-full max-w-200 rounded bg-white p-10 text-center shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
      >
        <h1 class="mb-7.5 text-2xl text-gray-800">问卷标题</h1>
        <p class="mb-8 text-left text-sm leading-[1.8] text-gray-600">
          为了给您提供更好的服务，希望能您抽出几分钟时间，将您的感受和建议告诉我们，我们非常重视每位用户的宝贵意见，期待您的参与！现在我们就马上开始吧！
        </p>
        <component v-if="activeComponent" :is="activeComponent" />
      </div>
    </section>

    <!-- 右侧编辑区 -->
    <aside class="flex w-75 flex-col overflow-y-auto border-l border-gray-300 bg-white p-6">
      <div
        v-if="activeStore && activeStore.editComponents && activeStore.editComponents.length > 0"
        class="flex flex-col gap-3"
      >
        <h2 class="mb-4 text-lg font-bold">编辑面板</h2>
        <component
          v-for="cmpName in activeStore.editComponents"
          :key="cmpName"
          :is="editComponentsMap[cmpName]"
        />
      </div>
      <div v-else class="flex h-full items-center justify-center text-sm text-gray-400">
        点击题型进行编辑
      </div>
    </aside>
  </main>
</template>
