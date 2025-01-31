<script setup>
import { inject } from 'vue';

// import useNumbers from '../composables/useNumbers';
import { useNumbers } from '../stores/numbers';

const { numbers, filterNum } = useNumbers();

// const { numbers, filterNumber } = useNumbers();

// const numbers = inject('numbers');
</script>

<template>
  <div>
    <h1>Great Grand Child</h1>
    <!-- <button @click="filterNumber(10)">filter number</button> -->
    {{ filterNum(2) }}
    <div class="line"></div>
  </div>
</template>
