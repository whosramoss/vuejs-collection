import { ref } from 'vue';

const numbers = ref([1, 2, 3, 4, 5]);

export default function () {
  const addNumber = (num) => numbers.value.push(num);

  const filterNumber = (minNum) => numbers.value.filter((num) => num <= minNum);

  return { numbers, addNumber, filterNumber };
}
