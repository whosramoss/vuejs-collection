<script setup>
import { useRoute, useRouter, RouterView } from 'vue-router';

import cars from '../data/cars.json';

const route = useRoute();
const router = useRouter();

const { id } = route.params;

const car = cars.find((c) => c.id === Number(id));
</script>

<template>
  <div v-if="car">
    <h1>Car View</h1>
    <p>{{ car.name }}</p>
    <p>{{ car.year }}</p>
    <p>{{ car.price }}$</p>
    <button @click="router.push(`/cars/${Number(car.id)}/contact`)">
      Click for contact
    </button>
    <RouterView />
  </div>
  <div v-else>
    <h1>Car not found</h1>
  </div>
</template>
