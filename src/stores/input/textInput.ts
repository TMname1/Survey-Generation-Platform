import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useTextInputStore = defineStore('textInput', () => {
  const editComponents = ref([
    'textStyle',
    'TitleSetting',
    'DescSetting',
    'SizeSetting',
    'ColorSetting',
    'BoldSetting',
    'ItalicSetting',
    'CenterSetting',
  ]);
  const style = ref<'多行文本' | '单行文本'>('多行文本');

  const title = ref('文本输入题默认标题');
  const desc = ref('文本输入题默认描述');

  const position = ref<'左对齐' | '居中对齐'>('左对齐');
  const titleSize = ref<22 | 20 | 18>(22);
  const descSize = ref<16 | 14 | 12>(16);

  const titleWeight = ref<'加粗' | '正常'>('加粗');
  const descWeight = ref<'加粗' | '正常'>('正常');
  const titleItalic = ref<'斜体' | '正常'>('正常');
  const titleColor = ref('#000');
  const descColor = ref('#909399');

  return {
    style,
    editComponents,
    title,
    desc,
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
