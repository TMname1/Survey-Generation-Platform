import { defineStore } from 'pinia';
import { createSingleChoiceStore } from './config/createSingleChoice.ts';

export const useSingleChoiceStore = defineStore('singleChoice', () => {
  return {
    ...createSingleChoiceStore(),
  };
});
