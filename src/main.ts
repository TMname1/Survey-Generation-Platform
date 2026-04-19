import './assets/base.css';
// 按需引入只会为模板中使用的组件自动注入样式。ElMessageBox 是命令式 API（JS 调用），resolver 识别不到，所以其 CSS 没有被加载。
// 需要手动引入 ElMessageBox 的样式
import 'element-plus/es/components/message-box/style/css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import * as ElementPlusIconsVue from '@element-plus/icons-vue';

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(createPinia());
app.use(router);

app.mount('#app');
