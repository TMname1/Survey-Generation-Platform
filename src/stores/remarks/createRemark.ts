import { computed, ref } from 'vue';

export const createRemarkStore = () => {
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
  const title = ref('默认标题内容');
  const desc = ref('备注说明');

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

export type createRemarkStoreType = typeof createRemarkStore;
