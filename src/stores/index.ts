import { defineStore } from 'pinia';
import { ref, unref } from 'vue';
import {
  createSingleChoiceStore,
  type createSingleChoiceStoreType,
} from './choice/config/createSingleChoice.ts';
import {
  createDropdownChoiceStore,
  type createDropdownChoiceStoreType,
} from './choice/config/createDropdownChoice.ts';
import {
  createMultipleChoiceStore,
  type createMultipleChoiceStoreType,
} from './choice/config/createMultipleChoice.ts';

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
  descSize?: number;
  titleWeight?: string;
  descWeight?: string;
  titleItalic?: string;
  titleColor?: string;
  descColor?: string;
  [key: string]: unknown;
}

export const useDataStore = defineStore('data', () => {
  const survey = ref<SurveyItem[]>([]);

  const addSurvey = (
    createFn:
      | createSingleChoiceStoreType
      | createDropdownChoiceStoreType
      | createMultipleChoiceStoreType,
    typeName: string = '单选题',
  ) => {
    const created = createFn();
    survey.value.push({
      id: Date.now(),
      type: typeName,
      editComponents: unref(created.editComponents),
      title: unref(created.title),
      desc: unref(created.desc),
      options: created.options ? unref(created.options) : undefined,
      position: unref(created.position),
      titleSize: unref(created.titleSize),
      descSize: unref(created.descSize),
      titleWeight: unref(created.titleWeight),
      descWeight: unref(created.descWeight),
      titleItalic: unref(created.titleItalic),
      titleColor: unref(created.titleColor),
      descColor: unref(created.descColor),
    });
  };

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
    },
  };
});
