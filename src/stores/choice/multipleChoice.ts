import { defineStore } from 'pinia';
import { createMultipleChoiceStore } from './config/createMultipleChoice.ts';

export const useMultipleChoiceStore = defineStore('multipleChoice', () => {
  return {
    ...createMultipleChoiceStore(),
  };
});
