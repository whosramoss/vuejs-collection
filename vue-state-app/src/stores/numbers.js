import { defineStore } from 'pinia';

export const useNumbers = defineStore('numbers', {
  state: () => {
    return {
      numbers: [1, 2, 3, 4, 5, 6],
    };
  },
  actions: {
    addNumber(num) {
      this.numbers.push(num);
    },
  },
  getters: {
    doubleNumber: (state) => {
      return state.numbers.map((num) => num * 2);
    },
    filterNum: (state) => {
      return (minNum) => state.numbers.filter((num) => num <= minNum);
    },
  },
});
