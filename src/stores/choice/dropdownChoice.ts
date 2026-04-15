import { defineStore } from 'pinia';
import { createDropdownChoiceStore } from './config/createDropdownChoice.ts';

export const useDropdownChoiceStore = defineStore('dropdownChoice', () => {
  return {
    ...createDropdownChoiceStore(),
  };
});
