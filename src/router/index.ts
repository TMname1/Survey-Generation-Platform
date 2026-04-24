import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/editorMaterials',
      name: 'materials',
      redirect: '/editorMaterials/selection',
      component: () => import('@/views/materials/IndexView.vue'),
      children: [
        {
          path: 'selection',
          name: 'materials-selection',
          component: () => import('@/views/materials/SelectionView.vue'),
        },
        {
          path: 'text-input',
          name: 'materials-text-input',
          component: () => import('@/views/materials/TextInputView.vue'),
        },
        {
          path: 'advanced',
          name: 'materials-advanced',
          component: () => import('@/views/materials/AdvancedView.vue'),
        },
        {
          path: 'remarks',
          name: 'materials-remarks',
          component: () => import('@/views/materials/RemarksView.vue'),
        },
        {
          path: 'personal-info',
          name: 'materials-personal-info',
          component: () => import('@/views/materials/PersonalInfoView.vue'),
        },
        {
          path: 'contact',
          name: 'materials-contact',
          component: () => import('@/views/materials/ContactView.vue'),
        },
      ],
    },
    {
      path: '/editor',
      name: 'editor',
      component: () => import('@/views/EditorView.vue'),
    },
    {
      path: '/data/:id',
      name: 'data',
      component: () => import('@/views/DataView.vue'),
    },
    {
      path: '/preview/:id',
      name: 'preview',
      component: () => import('@/views/PreviewView.vue'),
    },
    {
      path: '/online/:id',
      name: 'online-survey',
      component: () => import('@/views/OnlineSurveyView.vue'),
    },
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      redirect: '/',
    },
  ],
});

export default router;
