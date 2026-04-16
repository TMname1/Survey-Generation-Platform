import { computed, ref } from 'vue';

export const createRemarkTitleStore = () => {
  const editComponents = ref([
    'TypeSwitchSetting',
    'DescSetting',
    'CenterSetting',
    'SizeSetting',
    'BoldSetting',
    'ItalicSetting',
    'ColorSetting',
  ]);
  const type = ref('备注说明');
  const remarkType = ref<'title' | 'paragraph'>('title');
  const hasTitleSize = computed(() => remarkType.value === 'title');
  const hasDescSize = computed(() => remarkType.value === 'paragraph');
  const title = ref('问卷标题');
  const desc = ref('备注说明');

  const position = ref<'左对齐' | '居中对齐'>('居中对齐');
  const titleSize = ref<26 | 24 | 22>(26);
  const titleSizes = [26, 24, 22];
  const descSize = ref<16 | 14 | 12>(16);
  const descSizes = [16, 14, 12];

  const titleWeight = ref<'加粗' | '正常'>('正常');
  const descWeight = ref<'加粗' | '正常'>('正常');
  const titleItalic = ref<'斜体' | '正常'>('正常');
  const descItalic = ref<'斜体' | '正常'>('正常');
  const titleColor = ref('#000');
  const descColor = ref('#909399');

  return {
    type,
    editComponents,
    remarkType,
    hasTitleSize,
    hasDescSize,
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
    descItalic,
    titleColor,
    descColor,
  };
};

export const createRemarkCTXStore = () => {
  const editComponents = ref([
    'TypeSwitchSetting',
    'DescSetting',
    'CenterSetting',
    'SizeSetting',
    'BoldSetting',
    'ItalicSetting',
    'ColorSetting',
  ]);
  const type = ref('备注说明');
  const remarkType = ref<'title' | 'paragraph'>('paragraph');
  const hasTitleSize = computed(() => remarkType.value === 'title');
  const hasDescSize = computed(() => remarkType.value === 'paragraph');
  const title = ref('问卷标题');
  const desc = ref(
    '为了给您提供更好的服务，希望能您抽出几分钟时间，将您的感受和建议告诉我们，我们非常重视每位用户的宝贵意见，期待您的参与！现在我们就马上开始吧！',
  );

  const position = ref<'左对齐' | '居中对齐'>('左对齐');
  const titleSize = ref<26 | 24 | 22>(26);
  const titleSizes = [26, 24, 22];
  const descSize = ref<16 | 14 | 12>(16);
  const descSizes = [16, 14, 12];

  const titleWeight = ref<'加粗' | '正常'>('正常');
  const descWeight = ref<'加粗' | '正常'>('正常');
  const titleItalic = ref<'斜体' | '正常'>('正常');
  const descItalic = ref<'斜体' | '正常'>('正常');
  const titleColor = ref('#000');
  const descColor = ref('#000');

  return {
    type,
    editComponents,
    remarkType,
    hasTitleSize,
    hasDescSize,
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
    descItalic,
    titleColor,
    descColor,
  };
};

export type createRemarkTitleStoreType = typeof createRemarkTitleStore;
export type createRemarkCTXStoreType = typeof createRemarkCTXStore;
