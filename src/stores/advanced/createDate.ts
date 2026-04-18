import { ref } from 'vue';

export const createDateStore = () => {
  const editComponents = ref([
    'TitleSetting',
    'DescSetting',
    'SizeSetting',
    'ColorSetting',
    'BoldSetting',
    'ItalicSetting',
    'CenterSetting',
  ]);
  const title = ref('日期选择');
  const desc = ref('请选择日期');

  const position = ref<'左对齐' | '居中对齐'>('左对齐');
  const titleSize = ref<22 | 20 | 18>(22);
  const titleSizes = [22, 20, 18];
  const descSize = ref<16 | 14 | 12>(16);
  const descSizes = [16, 14, 12];

  const titleWeight = ref<'加粗' | '正常'>('加粗');
  const descWeight = ref<'加粗' | '正常'>('正常');
  const titleItalic = ref<'斜体' | '正常'>('正常');
  const titleColor = ref('#000');
  const descColor = ref('#909399');

  return {
    editComponents,
    title,
    desc,
    position,
    titleSize,
    titleSizes,
    descSize,
    descSizes,
    titleWeight,
    descWeight,
    titleItalic,
    titleColor,
    descColor,
  };
};

export type createDateStoreType = typeof createDateStore;
