<script setup>
import { defineProps } from 'vue';

const { image, name, occupation } = defineProps(['image', 'name']);
</script>

<template>
  <div>
    <n-card>
      <template #cover>
        <img :src="image" />
      </template>
      <h3>{{ name }}</h3>
      <slot></slot>
    </n-card>
  </div>
</template>

<style scoped>
.n-card {
  width: 200px;
  margin: 10px 20px;
}
.n-card img {
  height: 250px;
}
</style>
