<script setup lang="ts">
import { provide, shallowRef, ref, computed } from 'vue';
import router from '@/router/index.ts';
import { ArrowLeft } from '@element-plus/icons-vue';
import { ElMessageBox } from 'element-plus';
import { useDataStore, type SurveyItem } from '@/stores/survey.ts';
import { useMaterialsStore } from '@/stores/materials';
import { useDraggable } from 'vue-draggable-plus';
import { updateSurvey } from '@/apis/updateSurvey.ts';
import { v4 as uuidv4 } from 'uuid';

// Import components
import ButtonSelection from '@/components/ButtonSelection.vue';
import SingleChoice from '@/components/choice/SingleChoice.vue';
import MultipleChoice from '@/components/choice/MultipleChoice.vue';
import DropdownChoice from '@/components/choice/DropdownChoice.vue';
import RateComponent from '@/components/advanced/RateComponent.vue';
import DateComponent from '@/components/advanced/DateComponent.vue';
import TextInput from '@/components/input/textInput.vue';
import TitleComponent from '@/components/remarks/TitleComponent.vue';
import ParagraphComponent from '@/components/remarks/ParagraphComponent.vue';
import LoginComponent from '@/components/LoginComponent.vue';

// Import edit components
import BoldSetting from '@/components/editor/BoldSetting.vue';
import CenterSetting from '@/components/editor/CenterSetting.vue';
import ColorSetting from '@/components/editor/ColorSetting.vue';
import ItalicSetting from '@/components/editor/ItalicSetting.vue';
import RadioOption from '@/components/editor/RadioOption.vue';
import SizeSetting from '@/components/editor/SizeSetting.vue';
import TextStyle from '@/components/editor/textStyle.vue';
import TitleSetting from '@/components/editor/TitleSetting.vue';
import DescSetting from '@/components/editor/DescSetting.vue';
import { throttle } from '@/utils/throttle.ts';

const activeComponent = shallowRef<unknown>(null);
const activeComponentName = ref<string>('');
const dataStore = useDataStore();
const materialsStore = useMaterialsStore();

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
  备注标题: TitleComponent,
  备注段落: ParagraphComponent,
};

// 备注组件类型（这些组件不需要序号）
const remarkTypes = ['备注标题', '备注段落'];

// 计算每个组件的序号（只给非备注组件编号）
const questionIndices = computed(() => {
  const indices: Record<number, number> = {};
  let questionCount = 0;

  dataStore.survey.forEach((item) => {
    if (!remarkTypes.includes(item.type)) {
      questionCount++;
      indices[item.id] = questionCount;
    }
  });

  return indices;
});

provide('componentMap', componentMap);

provide('activeStore', activeStore);

const editComponentsMap: Record<string, unknown> = {
  TextStyle,
  TitleSetting,
  DescSetting,
  RadioOption,
  SizeSetting,
  ColorSetting,
  BoldSetting,
  ItalicSetting,
  CenterSetting,
};

const draggableElement = ref();
useDraggable(draggableElement, ref([...dataStore.survey]), {
  animation: 150,
  ghostClass: 'ghost',
  onUpdate({ oldIndex, newIndex }) {
    function moveElement(arr: SurveyItem[], fromIndex: number, toIndex: number) {
      const element = arr.splice(fromIndex, 1)[0] as SurveyItem;
      arr.splice(toIndex, 0, element);
      return arr;
    }
    moveElement(dataStore.survey, oldIndex!, newIndex!);
  },
});

export type surveyInfoType = {
  createDate: string;
  updateDate: string;
  surveyTitle: string;
  uuid: string;
};

const surveyTitle = ref<string>('');

const _survey = dataStore.survey;
surveyTitle.value = (_survey[_survey.length - 1]?.surveyTitle as string) || '';

// TODO: 当有修改时，应该提示可以保存
const handleSaveSurvey = throttle(async () => {
  const username = localStorage.getItem('username') as string;
  const authorization = localStorage.getItem('token') as string;

  if (!username || !authorization) {
    ElMessage.warning('请先登录或注册');
    return;
  }

  if (!surveyTitle.value.trim()) {
    ElMessage.warning('问卷未命名');
    return;
  }

  const survey = useDataStore().survey;

  const surveyInfo: surveyInfoType = {
    createDate: new Date().toLocaleDateString('zh-CN'),
    updateDate: new Date().toLocaleDateString('zh-CN'),
    surveyTitle: surveyTitle.value,
    uuid: uuidv4(),
  };

  const { msg } = await updateSurvey(username, authorization, [...survey, surveyInfo]);
  ElMessage.success(msg);
}, 1000);

// TODO: 修改问卷和刚开始保存问卷分开，这样可以更好的更新updateDate

const editorSurvey = computed(() => {
  return _survey.filter((item) => {
    return !item.uuid;
  });
});
</script>

<template>
  <nav class="flex h-16 items-center justify-between border-b border-gray-300 bg-white">
    <div class="flex h-full items-center gap-4">
      <div class="flex h-full w-16 items-center justify-center border-r border-gray-300">
        <el-button class="h-10! w-10!" :icon="ArrowLeft" circle @click="router.push('/')" />
      </div>
      <div>
        <!-- <el-button type="danger">重置问题</el-button> -->
        <!-- TODO: 已经存在的问卷是修改不是添加 -->
        <el-button type="success" @click="handleSaveSurvey">保存问卷</el-button>
      </div>
    </div>
    <div>
      <div
        class="relative mr-6 inline-flex min-w-37.5 items-center justify-center text-lg font-bold"
      >
        <!-- 镜像克隆元素，用于撑开宽度，invisible隐藏文字 -->
        <span class="invisible px-3 py-1">{{ surveyTitle || '未命名问卷' }}</span>
        <!-- 实际输入框 -->
        <input
          v-model="surveyTitle"
          class="absolute inset-0 h-full w-full rounded-lg border border-gray-300 bg-transparent text-center outline-none focus:border-blue-500"
          placeholder="未命名问卷"
          maxlength="60"
        />
      </div>
    </div>
    <div class="flex h-full items-center justify-center border-l border-gray-300 px-4">
      <LoginComponent />
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
    <aside class="flex w-60 flex-col overflow-y-auto border-r border-gray-300 bg-white p-5">
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
      <div class="w-155 rounded bg-white p-10 text-center shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
        <div class="flex flex-col" ref="draggableElement">
          <div
            v-for="item in editorSurvey"
            :key="item?.id"
            class="transition-shadow-scale relative cursor-pointer p-6 hover:scale-102 hover:shadow-lg"
            :class="{
              'border-2 border-blue-400 shadow-lg': activeSurveyId === item?.id,
            }"
            @click="setActiveSurvey(item as SurveyItem)"
          >
            <div
              class="absolute -top-2.5 -right-2.5 flex h-5 w-5 cursor-pointer items-center justify-center rounded-2xl border bg-red-400 text-sm text-white hover:bg-red-300"
              @click.stop="
                ElMessageBox.confirm('确定要删除该题目吗？', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning',
                })
                  .then(() => {
                    dataStore.removeSurvey(item?.id as number);
                    activeStore = null;
                  })
                  .catch(() => {})
              "
              v-show="activeSurveyId === item?.id"
            >
              x
            </div>
            <component
              :is="componentMap[item?.type as string]"
              :data="item"
              :question-index="questionIndices[item?.id as number]"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- 右侧编辑区 -->
    <aside class="flex w-70 flex-col overflow-y-auto border-l border-gray-300 bg-white p-4">
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

<style scoped>
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.transition-shadow-scale {
  transition:
    scale 0.3s ease,
    box-shadow 0.3s ease;
}

.transition-shadow-scale:active {
  transition: none;
}
</style>
