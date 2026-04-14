import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useDropdownChoiceStore = defineStore('dropdownChoice', () => {
  const editComponents = ref([
    'TitleSetting',
    'DescSetting',
    'RadioOption',
    'SizeSetting',
    'ColorSetting',
    'BoldSetting',
    'ItalicSetting',
    'CenterSetting',
  ]);
  const title = ref('下拉题默认标题');
  const desc = ref('下拉题默认描述');
  const options = ref(['默认选项1', '默认选项2', '默认选项3']);

  const position = ref<'左对齐' | '居中对齐'>('左对齐');
  const titleSize = ref<22 | 20 | 18>(22);
  const descSize = ref<16 | 14 | 12>(16);

  const titleWeight = ref<'加粗' | '正常'>('加粗');
  const descWeight = ref<'加粗' | '正常'>('正常');
  const titleItalic = ref<'斜体' | '正常'>('正常');
  const titleColor = ref('#000');
  const descColor = ref('#909399');

  return {
    editComponents,
    title,
    desc,
    options,
    position,
    titleSize,
    descSize,
    titleWeight,
    descWeight,
    titleItalic,
    titleColor,
    descColor,
  };
});
