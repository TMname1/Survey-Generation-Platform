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
import { createRateStore, type createRateStoreType } from './advanced/createRate.ts';
import { createDateStore, type createDateStoreType } from './advanced/createDate.ts';
import { createTextInputStore, type createTextInputStoreType } from './input/createTextInput.ts';
import { createRemarkCTXStore, type createRemarkCTXStoreType } from './remarks/createRemarkCTX.ts';
import {
  createRemarkTitleStore,
  type createRemarkTitleStoreType,
} from './remarks/createRemarkTitle.ts';

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
  [key: string]: unknown;
}

type SurveySource = ReturnType<
  | typeof createSingleChoiceStore
  | typeof createDropdownChoiceStore
  | typeof createMultipleChoiceStore
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
      | createRemarkTitleStoreType
      | createRemarkCTXStoreType
      | createRateStoreType
      | createDateStoreType
      | createTextInputStoreType,
    typeName: string = '单选题',
  ) => {
    const created = createFn() as SurveySource;
    const itemType = 'type' in created ? unref(created.type) : typeName;
    const item: SurveyItem = {
      id: Date.now(),
      type: itemType,
      editComponents: unref(created.editComponents),
      title:
        'title' in created
          ? unref((created as Record<string, unknown>).title as string)
          : undefined,
      desc:
        'desc' in created ? unref((created as Record<string, unknown>).desc as string) : undefined,
      options:
        'options' in created
          ? unref((created as Record<string, unknown>).options as string[])
          : undefined,
      position: unref(created.position),
      titleSize:
        'titleSize' in created
          ? unref((created as Record<string, unknown>).titleSize as number)
          : undefined,
      titleSizes:
        'titleSizes' in created
          ? unref((created as Record<string, unknown>).titleSizes as number[])
          : undefined,
      descSize:
        'descSize' in created
          ? unref((created as Record<string, unknown>).descSize as number)
          : undefined,
      descSizes:
        'descSizes' in created
          ? unref((created as Record<string, unknown>).descSizes as number[])
          : undefined,
      hasTitleSize:
        'hasTitleSize' in created
          ? unref((created as Record<string, unknown>).hasTitleSize as boolean)
          : false,
      hasDescSize:
        'hasDescSize' in created
          ? unref((created as Record<string, unknown>).hasDescSize as boolean)
          : false,
      titleWeight:
        'titleWeight' in created
          ? unref((created as Record<string, unknown>).titleWeight as string)
          : undefined,
      descWeight:
        'descWeight' in created
          ? unref((created as Record<string, unknown>).descWeight as string)
          : undefined,
      titleItalic:
        'titleItalic' in created
          ? unref((created as Record<string, unknown>).titleItalic as string)
          : undefined,
      descItalic:
        'descItalic' in created
          ? unref((created as Record<string, unknown>).descItalic as string)
          : undefined,
      titleColor:
        'titleColor' in created
          ? unref((created as Record<string, unknown>).titleColor as string)
          : undefined,
      descColor:
        'descColor' in created
          ? unref((created as Record<string, unknown>).descColor as string)
          : undefined,
      style:
        'style' in created
          ? unref((created as Record<string, unknown>).style as '多行文本' | '单行文本')
          : undefined,
    };

    survey.value.push(item);
  };

  // 初始化问卷标题和说明
  addSurvey(createRemarkTitleStore, '备注说明');
  setTimeout(() => {
    addSurvey(
      () =>
        createRemarkCTXStore(
          '为了给您提供更好的服务，希望您能抽出几分钟时间，将您的感受和建议告诉我们，我们非常重视每位用户的宝贵意见，期待您的参与！现在我们就马上开始吧！',
        ),
      '备注说明',
    );
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
      createRemarkTitleStore,
      createRemarkCTXStore,
      createRateStore,
      createDateStore,
      createTextInputStore,
    },
  };
});
