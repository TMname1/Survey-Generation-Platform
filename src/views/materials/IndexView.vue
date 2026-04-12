<script lang="ts" setup>
import router from '@/router/index.ts';
import { ArrowLeft, Select, Edit, Setting, Document, User, Phone } from '@element-plus/icons-vue';

const navItems = [
  { label: '选择', icon: Select, path: '/materials/selection' },
  { label: '文本输入', icon: Edit, path: '/materials/text-input' },
  { label: '高级题型', icon: Setting, path: '/materials/advanced' },
  { label: '备注说明', icon: Document, path: '/materials/remarks' },
  { label: '个人信息', icon: User, path: '/materials/personal-info' },
  { label: '联系方式', icon: Phone, path: '/materials/contact' },
];

const colors = ['primary', 'success', 'warning', 'danger'];
</script>

<template>
  <div class="box-border flex min-h-screen flex-col">
    <nav class="mb-5 flex items-center justify-between border border-gray-300">
      <div class="flex items-center justify-center border-r border-gray-300 p-5">
        <el-button :icon="ArrowLeft" circle @click="router.back()" />
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

    <main class="mx-auto flex w-[70vw] flex-row items-start justify-center">
      <aside class="z-10 mr-0 flex translate-x-px flex-col gap-4">
        <router-link
          v-for="(item, index) in navItems"
          :key="item.path"
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
        class="flex aspect-square h-[70vh] flex-1 overflow-hidden border border-dashed border-[#d0d7de] bg-[#fafbfc]"
        aria-label="materials-content"
      >
        <div class="flex-1 border-r border-gray-300 p-6">
          <router-view></router-view>
        </div>
        <div class="flex-2 border-r border-gray-300 p-6">显示对应的业务组件</div>
        <div class="flex-1 p-6">编辑面版</div>
      </section>
    </main>
  </div>
</template>
