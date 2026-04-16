import { defineStore } from 'pinia';
import { createRemarkStore } from './config/createRemark.ts';

export const useRemarkStore = defineStore('remark', () => {
  return {
    ...createRemarkStore(),
  };
});
