<script setup>
import { ref } from 'vue';

const count = ref(0);
</script>

<template>
  <main>
    <div>
      <h4>The current count is...</h4>
      <h1>{{ count }}</h1>
      <button @click="count--">-</button>
      <button @click="count++">+</button>
    </div>
  </main>
</template>

<style scoped>
main {
  width: 100vw;
  height: 100vh;
  background: #222;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>
