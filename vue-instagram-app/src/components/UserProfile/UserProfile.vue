<script setup lang="ts">
import { defineProps } from 'vue';

const { posts } = defineProps<{
  posts: { url: string; id: string }[];
}>();

const { VITE_SUPABASE_URL } = import.meta.env;
</script>

<template>
  <div class="container">
    <img
      class="image"
      v-for="post in posts"
      :key="post.id"
      :src="`${VITE_SUPABASE_URL}/storage/v1/object/public/${post.url}`"
      alt=""
    />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
}
.image {
  margin: 5px;
  width: 200px;
}
</style>
