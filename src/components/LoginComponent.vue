<script setup lang="ts">
import { ref, reactive } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { User } from '@element-plus/icons-vue';
import { loginUser } from '@/apis/login';
import { registerUser } from '@/apis/register';
import { throttle } from '@/utils/throttle';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

const dialogFormVisible = ref(false);
const dialogMode = ref<'login' | 'register'>('login');
const loginFormRef = ref<FormInstance>();

const loginForm = reactive({
  username: '',
  password: '',
});

const loginRules = reactive<FormRules>({
  username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 6, message: '密码不能少于6位', trigger: 'blur' },
  ],
});

const handleLogin = async () => {
  if (userStore.currentUsername) {
    try {
      await ElMessageBox.confirm(
        `当前已登录为: ${userStore.currentUsername}，是否退出登录？`,
        '提示',
        {
          confirmButtonText: '退出',
          cancelButtonText: '取消',
          type: 'warning',
        },
      );
      userStore.logout();
      ElMessage.success('已退出登录');
    } catch {}
    return;
  }

  // Show dialog
  dialogMode.value = 'login';
  loginForm.username = '';
  loginForm.password = '';
  dialogFormVisible.value = true;
};

const handleRegister = () => {
  dialogMode.value = 'register';
  loginForm.username = '';
  loginForm.password = '';
  dialogFormVisible.value = true;
};

const confirmAuth = throttle(async () => {
  if (!loginFormRef.value) return;

  try {
    await loginFormRef.value.validate();
  } catch {
    return;
  }

  const { username, password } = loginForm;
  try {
    if (dialogMode.value === 'login') {
      const loginRes = await loginUser(username, password);

      if (loginRes.error) {
        ElMessage.error(loginRes.error);
        return;
      }

      if (loginRes.ok) {
        ElMessage.success(loginRes.msg || '登录成功！');
        userStore.setUsername(username);
        dialogFormVisible.value = false;
      } else {
        ElMessage.error(loginRes.msg || '登录失败');
      }
    } else {
      const regRes = await registerUser(username, password);

      if (regRes.ok) {
        ElMessage.success('注册成功，自动登录中...');
        const loginRes = await loginUser(username, password);
        if (loginRes.ok) {
          ElMessage.success('登录成功！');
          userStore.setUsername(username);
          dialogFormVisible.value = false;
        } else {
          ElMessage.error('自动登录失败，请手动登录');
          dialogMode.value = 'login';
        }
      } else {
        ElMessage.error(regRes.msg || '注册失败');
      }
    }
  } catch (err) {
    ElMessage.error('请求失败');
    console.error(err);
  }
}, 1000);

defineProps({
  gapVal: {
    type: String,
    default: '',
  },
});
</script>

<template>
  <div class="flex items-center" :class="gapVal">
    <el-button type="info" :icon="User" @click="handleLogin">
      {{ userStore.currentUsername || '登录' }}
    </el-button>
    <el-button
      v-if="!userStore.currentUsername"
      type="warning"
      :icon="User"
      @click="handleRegister"
    >
      注册
    </el-button>
  </div>

  <!-- 登录/注册对话框 -->
  <el-dialog
    v-model="dialogFormVisible"
    :title="dialogMode === 'login' ? '用户登录' : '用户注册'"
    width="500"
  >
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginRules"
      label-width="80px"
      @submit.prevent
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginForm.username" placeholder="请输入用户名" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          placeholder="请输入密码"
          autocomplete="off"
          @keyup.enter="confirmAuth"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmAuth">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>
