import { defineStore } from 'pinia';
import { ref } from 'vue';
import { createDropdownChoiceStore } from './choice/config/createDropdownChoice.ts';

export const useMaterialsStore = defineStore('materials', () => {
  const selectionBtnData = ref([
    { id: '单选题', name: '单选题' },
    { id: '多选题', name: '多选题' },
    { id: '下拉选择题', name: '下拉选择题' },
    // TODO: 完成图片选择
    // { id: '图片单选题', name: '图片单选题' },
    // { id: '图片多选题', name: '图片多选题' },
  ]);

  const textInputBtnData = ref([{ id: '文本输入', name: '文本输入' }]);

  const advancedBtnData = ref([
    { id: '评价', name: '评价' },
    { id: '日期', name: '日期' },
  ]);

  const remarkBtnData = ref([{ id: '备注说明', name: '备注说明' }]);

  const personalInfoBtnData = ref([
    { id: '1', name: '测试1' },
    { id: '2', name: '测试2' },
    { id: '3', name: '测试3' },
    { id: '4', name: '测试4' },
  ]);

  const contactBtnData = ref([
    { id: '1', name: '测试1' },
    { id: '2', name: '测试2' },
    { id: '3', name: '测试3' },
    { id: '4', name: '测试4' },
  ]);

  const materials = [createDropdownChoiceStore()];

  return {
    selectionBtnData,
    textInputBtnData,
    advancedBtnData,
    remarkBtnData,
    personalInfoBtnData,
    contactBtnData,
    // TODO: 待测试，将所有组件集中
    materials,
  };
});
