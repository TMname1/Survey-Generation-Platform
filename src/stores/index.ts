import { defineStore } from 'pinia';
import { createSingleChoiceStore } from './choice/singleChoiceTest.ts';

export const useDataStore = defineStore('data', () => {
  return {
    createSingleChoiceStore,
  };
});
