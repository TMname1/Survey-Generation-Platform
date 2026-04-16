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

import { useDataStore, type SurveyItem } from '@/stores/index.ts';
import { useMaterialsStore } from '@/stores/materials';

const dataStore = useDataStore();
const materialsStore = useMaterialsStore();

// Import components
import ButtonSelection from '@/components/ButtonSelection.vue';
import SingleChoice from '@/components/choice/SingleChoice.vue';
import MultipleChoice from '@/components/choice/MultipleChoice.vue';
import DropdownChoice from '@/components/choice/DropdownChoice.vue';
import RateComponent from '@/components/advanced/RateComponent.vue';
import DateComponent from '@/components/advanced/DateComponent.vue';
import TextInput from '@/components/input/textInput.vue';
import RemarkComponent from '@/components/remarks/RemarkComponent.vue';

// Import edit components
import BoldSetting from '@/components/editor/BoldSetting.vue';
import CenterSetting from '@/components/editor/CenterSetting.vue';
import ColorSetting from '@/components/editor/ColorSetting.vue';
import ItalicSetting from '@/components/editor/ItalicSetting.vue';
import RadioOption from '@/components/editor/RadioOption.vue';
import SizeSetting from '@/components/editor/SizeSetting.vue';
import TextStyle from '@/components/editor/textStyle.vue';
import TypeSwitchSetting from '@/components/editor/TypeSwitchSetting.vue';

import TitleSetting from '@/views/materials/TitleSetting.vue';
import DescSetting from '@/views/materials/DescSetting.vue';

const activeComponent = shallowRef<unknown>(null);
const activeComponentName = ref<string>('');

const activeStore = ref<SurveyItem | null>(null);
const activeSurveyId = computed(() => activeStore.value?.id);

const setActiveSurvey = (item: SurveyItem) => {
  activeStore.value = activeStore.value === item ? null : item;

  if (typeof item.type === 'string' && componentMap[item.type]) {
    activeComponent.value = componentMap[item.type];
    activeComponentName.value = item.type;
  }
};

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
  备注说明: RemarkComponent,
};

provide('componentMap', componentMap);

provide('activeStore', activeStore);

const editComponentsMap: Record<string, unknown> = {
  // TODO: 名字改回来
  textStyle: TextStyle,
  TitleSetting,
  DescSetting,
  RadioOption,
  SizeSetting,
  ColorSetting,
  BoldSetting,
  ItalicSetting,
  CenterSetting,
  TypeSwitchSetting,
};
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
        <div
          class="mb-6 flex cursor-pointer flex-col items-center justify-between text-center text-sm text-blue-500"
        >
          <el-icon><Folder /></el-icon>
          <div>题型</div>
        </div>
        <div
          class="mb-6 flex cursor-pointer flex-col items-center justify-between text-center text-sm text-gray-500"
        >
          <el-icon><List /></el-icon>
          <div>大纲</div>
        </div>
      </div>
    </aside>
    <aside class="flex w-65 flex-col overflow-y-auto border-r border-gray-300 bg-white p-5">
      <div class="mb-5">
        <div class="mb-2.5 flex items-center text-sm font-bold">
          <el-icon class="mr-1"><CircleCheck /></el-icon> 选择
        </div>
        <ButtonSelection :data="materialsStore.selectionBtnData" />
      </div>
      <div class="mb-5">
        <div class="mb-2.5 flex items-center text-sm font-bold">
          <el-icon class="mr-1"><EditPen /></el-icon> 文本输入
        </div>
        <ButtonSelection :data="materialsStore.textInputBtnData" />
      </div>

      <div class="mb-5">
        <div class="mb-2.5 flex items-center text-sm font-bold">
          <el-icon class="mr-1"><MessageBox /></el-icon> 高级题型
        </div>
        <ButtonSelection :data="materialsStore.advancedBtnData" />
      </div>

      <div class="mb-5">
        <div class="mb-2.5 flex items-center text-sm font-bold">
          <el-icon class="mr-1"><ChatLineSquare /></el-icon> 备注说明
        </div>
        <ButtonSelection :data="materialsStore.remarkBtnData" />
      </div>

      <div class="mb-5">
        <div class="mb-2.5 flex items-center text-sm font-bold">
          <el-icon class="mr-1"><User /></el-icon> 个人信息
        </div>
        <ButtonSelection :data="materialsStore.personalInfoBtnData" />
      </div>
      <div class="mb-5">
        <div class="mb-2.5 flex items-center text-sm font-bold">
          <el-icon class="mr-1"><Message /></el-icon> 联系方式
        </div>
        <ButtonSelection :data="materialsStore.contactBtnData" />
      </div>
    </aside>

    <!-- 中间预览区 -->
    <section
      class="flex flex-1 flex-col items-center overflow-y-auto bg-linear-to-br from-blue-100 to-white p-10"
    >
      <div class="rounded bg-white p-4 text-center shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
        <h1 class="mb-7.5 text-2xl text-gray-800">问卷标题</h1>
        <p class="mb-8 text-left text-sm leading-[1.8] text-gray-600">
          为了给您提供更好的服务，希望能您抽出几分钟时间，将您的感受和建议告诉我们，我们非常重视每位用户的宝贵意见，期待您的参与！现在我们就马上开始吧！
        </p>
        <div class="flex flex-col gap-4">
          <div
            v-for="item in dataStore.survey"
            :key="item.id"
            class="relative cursor-pointer border border-transparent p-4 transition ease-out hover:shadow-lg"
            :class="{ 'shadow-lg': activeSurveyId === item.id }"
            @click="setActiveSurvey(item)"
          >
            <div
              class="absolute -top-2.5 -right-2.5 flex h-5 w-5 cursor-pointer items-center justify-center rounded-2xl border bg-red-400 text-sm text-white hover:bg-red-300"
              @click="
                dataStore.removeSurvey(item.id);
                activeStore = null;
                setActiveSurvey(item);
              "
              v-show="activeSurveyId === item.id"
            >
              x
            </div>
            <component :is="componentMap[item.type]" :data="item" />
          </div>
        </div>
      </div>
    </section>

    <!-- 右侧编辑区 -->
    <aside class="flex w-80 flex-col overflow-y-auto border-l border-gray-300 bg-white p-6">
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
        点击组件进行编辑
      </div>
    </aside>
  </main>
</template>
