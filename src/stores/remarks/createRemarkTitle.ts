import { ref } from 'vue';

export const createRemarkTitleStore = () => {
  const editComponents = ref([
    'TitleSetting',
    'CenterSetting',
    'SizeSetting',
    'BoldSetting',
    'ItalicSetting',
    'ColorSetting',
  ]);
  const type = ref('备注标题');
  const hasTitleSize = ref(true);
  const hasDescSize = ref(false);
  const title = ref('问卷标题');

  const position = ref<'左对齐' | '居中对齐'>('居中对齐');
  const titleSize = ref<26 | 24 | 22>(26);
  const titleSizes = [26, 24, 22];

  const titleWeight = ref<'加粗' | '正常'>('正常');
  const titleItalic = ref<'斜体' | '正常'>('正常');
  const titleColor = ref('#000');

  return {
    type,
    editComponents,
    hasTitleSize,
    title,
    position,
    titleSize,
    titleSizes,
    titleWeight,
    titleItalic,
    titleColor,
    hasDescSize,
  };
};

export type createRemarkTitleStoreType = typeof createRemarkTitleStore;
