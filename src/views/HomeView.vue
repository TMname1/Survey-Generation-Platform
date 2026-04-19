<script setup lang="ts">
import { ref, reactive } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { Edit, Plus, User } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import { loginUser } from '@/apis/login';
import { registerUser } from '@/apis/register';

const router = useRouter();
const currentUsername = ref('');
const dialogFormVisible = ref(false);
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
  if (currentUsername.value) {
    try {
      await ElMessageBox.confirm(`当前已登录为: ${currentUsername.value}，是否退出登录？`, '提示', {
        confirmButtonText: '退出',
        cancelButtonText: '取消',
        type: 'warning',
      });
      currentUsername.value = '';
      ElMessage.success('已退出登录');
    } catch {}
    return;
  }

  // Show dialog
  loginForm.username = '';
  loginForm.password = '';
  dialogFormVisible.value = true;
};

const confirmLogin = async () => {
  if (!loginFormRef.value) return;

  try {
    // Development环境会有warning的控制台输出，production环境不会有
    await loginFormRef.value.validate();
  } catch {
    return;
  }

  const { username, password } = loginForm;
  try {
    const loginRes = await loginUser(username, password);

    if (loginRes.error === '密码错误') {
      ElMessage.error('密码错误');
      return;
    }

    if (loginRes.ok) {
      ElMessage.success(loginRes.msg || '登录成功！');
      currentUsername.value = username;
      dialogFormVisible.value = false;
    } else {
      // 尝试注册
      const regRes = await registerUser(username, password);

      if (regRes.ok) {
        ElMessage.success('注册并登录成功！');
        currentUsername.value = username;
        dialogFormVisible.value = false;
      } else {
        ElMessage.error(regRes.msg || '登录或注册失败');
      }
    }
  } catch (err) {
    ElMessage.error('请求失败');
    console.error(err);
  }
};

const tableData = [
  {
    createDate: '2026-04-12',
    title: '用户满意度调查',
    questionCount: 12,
    updateDate: '2026-04-12',
  },
];
</script>

<template>
  <div class="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
    <div class="mx-auto flex w-full max-w-6xl flex-col items-center gap-8">
      <h1 class="text-center text-3xl font-semibold tracking-wider text-slate-900">问卷系统</h1>

      <div class="flex w-full items-center justify-start gap-4">
        <el-button type="primary" :icon="Plus" @click="router.push('/editor')">创建问卷</el-button>
        <el-button type="success" :icon="Edit" @click="router.push('/editorMaterials')">
          自定义组件
        </el-button>
        <el-button type="info" :icon="User" @click="handleLogin">
          {{ currentUsername || '登录' }}
        </el-button>
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

    <!-- 登录对话框 -->
    <el-dialog v-model="dialogFormVisible" title="用户登录(自动注册)" width="500">
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
            @keyup.enter="confirmLogin"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmLogin">确认</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
