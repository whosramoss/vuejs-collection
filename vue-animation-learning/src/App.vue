<script setup>
import { RouterView, RouterLink } from 'vue-router';
</script>

<template>
  <header class="container">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
  </header>
  <RouterView />
</template>

<style scoped>
.container {
  max-width: 300px;
  margin: 0 auto;
}
</style>
