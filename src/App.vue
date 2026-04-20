<script setup lang="ts">
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import { onBeforeMount } from 'vue';
import { useUserStore } from '@/stores/user';
import { loginUser } from '@/apis/login';

onBeforeMount(async () => {
  const token = localStorage.getItem('token');
  const userStore = useUserStore();

  if (token) {
    try {
      const response = await loginUser(undefined, undefined, token);
      if (response && response.ok) {
        userStore.useJWT(token);
      } else {
        userStore.logout();
      }
    } catch {
      userStore.logout();
    }
  } else {
    userStore.logout();
  }
});
</script>

<template>
  <el-config-provider :locale="zhCn"> <router-view /></el-config-provider>
</template>
