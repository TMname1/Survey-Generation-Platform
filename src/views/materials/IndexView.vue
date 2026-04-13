<script lang="ts" setup>
import { provide, shallowRef } from 'vue';
import router from '@/router/index.ts';
import { ArrowLeft, Select, Edit, Setting, Document, User, Phone } from '@element-plus/icons-vue';

// Import components
import SingleChoice from '@/components/buttonItem/SingleChoice.vue';
import MultipleChoice from '@/components/buttonItem/MultipleChoice.vue';
import DropdownChoice from '@/components/buttonItem/DropdownChoice.vue';
import ImageSingleChoice from '@/components/buttonItem/ImageSingleChoice.vue';

// Import materials components
import BoldSetting from '@/components/materials/BoldSetting.vue';
import CenterSetting from '@/components/materials/CenterSetting.vue';
import ColorSetting from '@/components/materials/ColorSetting.vue';
import ItalicSetting from '@/components/materials/ItalicSetting.vue';
import RadioOption from '@/components/materials/RadioOption.vue';
import SizeSetting from '@/components/materials/SizeSetting.vue';

// Local materials components
import TitleSetting from './TitleSetting.vue';
import DescSetting from './DescSetting.vue';

const activeComponent = shallowRef<unknown>(null);

provide('activeComponent', {
  setComponent: (cmp: unknown) => {
    activeComponent.value = cmp;
  },
});

const componentMap: Record<string, unknown> = {
  单选题: SingleChoice,
  多选题: MultipleChoice,
  下拉选择: DropdownChoice,
  图片单选题: ImageSingleChoice,
};

provide('componentMap', componentMap);

const navItems = [
  { label: '选择', icon: Select, path: { name: 'materials-selection' } },
  { label: '文本输入', icon: Edit, path: { name: 'materials-text-input' } },
  { label: '高级题型', icon: Setting, path: { name: 'materials-advanced' } },
  { label: '备注说明', icon: Document, path: { name: 'materials-remarks' } },
  { label: '个人信息', icon: User, path: { name: 'materials-personal-info' } },
  { label: '联系方式', icon: Phone, path: { name: 'materials-contact' } },
];

const colors = ['primary', 'success', 'warning', 'danger'];
</script>

<template>
  <div class="box-border flex min-h-screen flex-col">
    <nav class="mb-5 flex items-center justify-between border border-gray-300">
      <div class="flex items-center justify-center border-r border-gray-300 p-5">
        <el-button :icon="ArrowLeft" circle @click="router.push('/')" />
      </div>
      <div class="border-l border-gray-300 p-5">
        <el-avatar
          class="border-2 border-white shadow-[0_4px_12px_rgba(0,0,0,0.12)]"
          :size="42"
          src="https://uapis.cn/assets/acg/pc/0072Vf1pgy1foxkjbqfwjj31hc0u0000.jpg"
        />
      </div>
    </nav>

    <h1 class="mb-5 text-center text-[28px] font-bold text-[#1f2329]">组件市场</h1>

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
        class="flex aspect-square h-[75vh] flex-1 overflow-hidden border border-dashed border-[#d0d7de] bg-[#fafbfc]"
        aria-label="materials-content"
      >
        <div class="flex-1 border-r border-gray-300 p-6">
          <router-view></router-view>
        </div>
        <div class="flex-2 border-r border-gray-300 p-6">
          <component v-if="activeComponent" :is="activeComponent" />
        </div>
        <div class="flex-1.5 overflow-y-auto p-6">
          <h2 class="mb-4 text-lg font-bold">编辑面板</h2>
          <div class="flex flex-col gap-3">
            <TitleSetting />
            <DescSetting />
            <RadioOption />
            <SizeSetting />
            <ColorSetting />
            <BoldSetting />
            <ItalicSetting />
            <CenterSetting />
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
