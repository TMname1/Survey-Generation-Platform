import { defineStore } from 'pinia';
import { ref, unref } from 'vue';
import {
  createSingleChoiceStore,
  type createSingleChoiceStoreType,
} from './choice/createSingleChoice.ts';
import {
  createDropdownChoiceStore,
  type createDropdownChoiceStoreType,
} from './choice/createDropdownChoice.ts';
import {
  createMultipleChoiceStore,
  type createMultipleChoiceStoreType,
} from './choice/createMultipleChoice.ts';
import { createRemarkStore, type createRemarkStoreType } from './remarks/createRemark.ts';
import { createRateStore, type createRateStoreType } from './advanced/createRate.ts';
import { createDateStore, type createDateStoreType } from './advanced/createDate.ts';
import { createTextInputStore, type createTextInputStoreType } from './input/createTextInput.ts';
import {
  createRemarkCTXStore,
  createRemarkTitleStore,
  type createRemarkCTXStoreType,
  type createRemarkTitleStoreType,
} from './remarks/createDefaultRemark.ts';

export interface SurveyItem {
  id: number;
  type: string;
  editComponents?: string[];
  style?: '多行文本' | '单行文本';
  title?: string;
  desc?: string;
  options?: string[];
  position?: string;
  titleSize?: number;
  titleSizes?: number[];
  descSize?: number;
  descSizes?: number[];
  hasTitleSize?: boolean;
  hasDescSize?: boolean;
  titleWeight?: string;
  descWeight?: string;
  titleItalic?: string;
  descItalic?: string;
  titleColor?: string;
  descColor?: string;
  remarkType?: 'title' | 'paragraph';
  [key: string]: unknown;
}

type SurveySource = ReturnType<
  | typeof createSingleChoiceStore
  | typeof createDropdownChoiceStore
  | typeof createMultipleChoiceStore
  | typeof createRemarkStore
  | typeof createRemarkTitleStore
  | typeof createRemarkCTXStore
  | typeof createRateStore
  | typeof createDateStore
  | typeof createTextInputStore
>;

export const useDataStore = defineStore('data', () => {
  const survey = ref<SurveyItem[]>([]);

  const addSurvey = (
    createFn:
      | createSingleChoiceStoreType
      | createDropdownChoiceStoreType
      | createMultipleChoiceStoreType
      | createRemarkStoreType
      | createRemarkTitleStoreType
      | createRemarkCTXStoreType
      | createRateStoreType
      | createDateStoreType
      | createTextInputStoreType,
    typeName: string = '单选题',
  ) => {
    const created = createFn() as SurveySource;
    const item: SurveyItem = {
      id: Date.now(),
      type: typeName,
      editComponents: unref(created.editComponents),
      title: unref(created.title),
      desc: unref(created.desc),
      options:
        'options' in created
          ? unref((created as Record<string, unknown>).options as string[])
          : undefined,
      position: unref(created.position),
      titleSize: unref(created.titleSize),
      titleSizes: 'titleSizes' in created ? unref(created.titleSizes) : undefined,
      descSize: unref(created.descSize),
      descSizes: 'descSizes' in created ? unref(created.descSizes) : undefined,
      hasTitleSize: true,
      hasDescSize: true,
      titleWeight: unref(created.titleWeight),
      descWeight: unref(created.descWeight),
      titleItalic: unref(created.titleItalic),
      descItalic:
        'descItalic' in created
          ? unref((created as Record<string, unknown>).descItalic as string)
          : undefined,
      titleColor: unref(created.titleColor),
      descColor: unref(created.descColor),
      remarkType:
        'remarkType' in created
          ? unref((created as Record<string, unknown>).remarkType as 'title' | 'paragraph')
          : undefined,
      style:
        'style' in created
          ? unref((created as Record<string, unknown>).style as '多行文本' | '单行文本')
          : undefined,
    };

    Object.defineProperties(item, {
      hasTitleSize: {
        enumerable: true,
        configurable: true,
        get: () => item.remarkType === 'title' || item.remarkType === undefined,
      },
      hasDescSize: {
        enumerable: true,
        configurable: true,
        get: () => item.remarkType === 'paragraph' || item.remarkType === undefined,
      },
    });

    survey.value.push(item);
  };

  // 初始化问卷标题和说明
  addSurvey(createRemarkTitleStore, '备注说明');
  setTimeout(() => {
    addSurvey(createRemarkCTXStore, '备注说明');
  }, 100);

  const removeSurvey = (id: number) => {
    survey.value = survey.value.filter((item) => item.id !== id);
  };

  return {
    survey,
    addSurvey,
    removeSurvey,
    createFn: {
      createSingleChoiceStore,
      createDropdownChoiceStore,
      createMultipleChoiceStore,
      createRemarkStore,
      createRateStore,
      createDateStore,
      createTextInputStore,
    },
  };
});
