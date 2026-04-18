import { ref } from 'vue';

export const createRemarkCTXStore = (text: string = '备注说明') => {
  const editComponents = ref([
    'DescSetting',
    'CenterSetting',
    'SizeSetting',
    'BoldSetting',
    'ItalicSetting',
    'ColorSetting',
  ]);
  const type = ref('备注段落');
  const hasDescSize = ref(true);
  const hasTitleSize = ref(false);
  const desc = ref(text);

  const position = ref<'左对齐' | '居中对齐'>('左对齐');
  const descSize = ref<16 | 14 | 12>(16);
  const descSizes = [16, 14, 12];

  const descWeight = ref<'加粗' | '正常'>('正常');
  const descItalic = ref<'斜体' | '正常'>('正常');
  const descColor = ref('#000');

  return {
    type,
    editComponents,
    hasDescSize,
    desc,
    position,
    descSize,
    descSizes,
    descWeight,
    descItalic,
    descColor,
    hasTitleSize,
  };
};

export type createRemarkCTXStoreType = typeof createRemarkCTXStore;
