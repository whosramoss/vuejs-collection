<script setup>
import { inject } from 'vue';

import GrandChild from './GrandChild.vue';
// import useNumbers from '../composables/useNumbers';
import { useNumbers } from '../stores/numbers';

const { numbers, addNumber } = useNumbers();

// const { numbers, addNumber } = useNumbers();

// const numbers = inject('numbers');
</script>

<template>
  <div>
    <h1>Child</h1>
    {{ numbers }}
    <button @click="addNumber(4)">add number</button>
    <div class="line"></div>
    <GrandChild />
  </div>
</template>
