<script lang="ts" setup>
import { provide, shallowRef, ref, computed } from 'vue';
import router from '@/router/index.ts';
import { ArrowLeft, Select, Edit, Setting, Document, User, Phone } from '@element-plus/icons-vue';
import { useRateStore } from '@/stores/advanced/rate';
import { useDateStore } from '@/stores/advanced/date';
import { useMaterialsStore } from '@/stores/materials.ts';
import { useTextInputStore } from '@/stores/input/textInput';

// Import components
import SingleChoice from '@/components/choice/SingleChoice.vue';
import MultipleChoice from '@/components/choice/MultipleChoice.vue';
import DropdownChoice from '@/components/choice/DropdownChoice.vue';
import RateComponent from '@/components/advanced/RateComponent.vue';
import DateComponent from '@/components/advanced/DateComponent.vue';
import TextInput from '@/components/input/textInput.vue';
import RemarkComponent from '@/components/remarks/RemarkComponent.vue';

// Import materials components
import BoldSetting from '@/components/editor/BoldSetting.vue';
import CenterSetting from '@/components/editor/CenterSetting.vue';
import ColorSetting from '@/components/editor/ColorSetting.vue';
import ItalicSetting from '@/components/editor/ItalicSetting.vue';
import RadioOption from '@/components/editor/RadioOption.vue';
import SizeSetting from '@/components/editor/SizeSetting.vue';
import TextStyle from '@/components/editor/textStyle.vue';
import TypeSwitchSetting from '@/components/editor/TypeSwitchSetting.vue';

// Local materials components
import TitleSetting from './TitleSetting.vue';
import DescSetting from './DescSetting.vue';

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
  备注说明: RemarkComponent,
  // TODO: 完成后面
  // 图片单选题: ImageSingleChoice,
  // 图片多选题: ....
};

provide('componentMap', componentMap);

const navItems = [
  { label: '选择', icon: Select, path: { name: 'materials-selection' } },
  { label: '文本输入', icon: Edit, path: { name: 'materials-text-input' } },
  { label: '高级题型', icon: Setting, path: { name: 'materials-advanced' } },
  // TODO: 完成后面
  { label: '备注说明', icon: Document, path: { name: 'materials-remarks' } },
  { label: '个人信息', icon: User, path: { name: 'materials-personal-info' } },
  { label: '联系方式', icon: Phone, path: { name: 'materials-contact' } },
];

const colors = ['primary', 'success', 'warning', 'danger'];

// const singleChoiceStore = useDataStore().createSingleChoiceStore();
// console.log(singleChoiceStore);

// import { useDataStore } from '@/stores/index.ts';

// const dataStore = useDataStore();

// const singleChoiceStore = dataStore.createFn.createSingleChoiceStore();

const materialsStore = useMaterialsStore();

const singleChoiceStore = materialsStore.materials[0]!;
const multipleChoiceStore = materialsStore.materials[1]!;
const dropdownChoiceStore = materialsStore.materials[2]!;
const rateStore = useRateStore();
const dateStore = useDateStore();
const textInputStore = useTextInputStore();
const remarkStore = materialsStore.materials[3]!;

const activeStore = computed(() => {
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
  if (activeComponentName.value === '备注说明') {
    return remarkStore;
  }
  // 默认为单选题或单选题 store
  return singleChoiceStore;
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
  TypeSwitchSetting,
};
</script>

<template>
  <div class="box-border flex min-h-screen flex-col">
    <nav class="mb-10 flex h-16 items-center justify-between border border-gray-300">
      <div class="flex h-full w-16 items-center justify-center border-r border-gray-300">
        <el-button class="h-10! w-10!" :icon="ArrowLeft" circle @click="router.push('/')" />
      </div>
      <div class="flex h-full w-16 items-center justify-center border-l border-gray-300">
        <el-avatar
          class="border-2 border-white shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-transform duration-500 hover:rotate-360"
          :size="42"
          src="https://avatars.githubusercontent.com/u/84985340"
        />
      </div>
    </nav>

    <main class="mx-auto flex w-[90vw] flex-row items-start justify-center">
      <aside class="z-10 mr-0 flex translate-x-px flex-col gap-4">
        <router-link
          v-for="(item, index) in navItems"
          :key="item.path.name"
          :to="item.path"
          class="flex h-16 w-16 flex-col items-center justify-center rounded-xl rounded-tr-none rounded-br-none border border-r-0 border-[#d0d7de] bg-white shadow-sm transition-colors hover:bg-gray-50"
          :style="{ color: `var(--el-color-${colors[index % 4]})` }"
          active-class="!bg-[#fafbfc]"
        >
          <el-icon :size="18"><component :is="item.icon" /></el-icon>
          <span class="mt-2 text-[13px] font-medium text-gray-700">{{ item.label }}</span>
        </router-link>
      </aside>
      <section
        class="flex aspect-square h-[80vh] flex-1 overflow-hidden border border-dashed border-[#d0d7de] bg-[#fafbfc]"
        aria-label="materials-content"
      >
        <div class="flex-1 border-r border-gray-300 p-6">
          <router-view></router-view>
        </div>
        <div class="relative flex-2 border-r border-gray-300 p-6 wrap-anywhere">
          <component v-if="activeComponent" :is="activeComponent" :data="activeStore" />
          <div v-else class="absolute top-1/2 left-1/2 -translate-1/2 text-gray-400">
            点击组件进行查看
          </div>
        </div>
        <div class="flex-1.5 overflow-y-auto p-6">
          <h2 class="mb-4 text-lg font-bold">编辑面板</h2>
          <div class="relative min-h-130 min-w-70">
            <div v-if="activeComponent" class="flex flex-col gap-3">
              <component
                v-for="cmpName in activeStore.editComponents"
                :key="cmpName"
                :is="editComponentsMap[cmpName]"
              />
            </div>
            <div
              v-else
              class="absolute top-1/2 left-1/2 flex -translate-1/2 items-center justify-center text-sm text-gray-400"
            >
              点击组件进行编辑
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
