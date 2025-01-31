<script setup>
import { RouterLink } from 'vue-router';

import cars from '../data/cars.json';
</script>

<template>
  <div>
    <h1>Home Page</h1>
    <div class="cars">
      <RouterLink v-for="car in cars" :key="car.id" :to="`/cars/${car.id}`">{{
        car.name
      }}</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.cars {
  display: flex;
  gap: 10px;
}

.cars a {
  text-decoration: none;
  color: white;
}
</style>
