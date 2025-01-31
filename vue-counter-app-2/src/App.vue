<!-- composition api -->
<script setup>
import { ref } from 'vue';

const count = ref(0);

const addToCount = () => count.value++;
const subtractFromCount = () => count.value--;
</script>

<!-- option api -->
<!-- <script>
export default {
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    addToCount() {
      this.count++;
    },
    subtractFromCount() {
      this.count--;
    },
  },
};
</script> -->

<template>
  <div>
    <h4>The current count is...</h4>
    <h1>{{ count }}</h1>
    <button @click="subtractFromCount()">-</button>
    <button @click="addToCount()">+</button>
  </div>
</template>

<style scoped>
div {
  text-align: center;
}
</style>
