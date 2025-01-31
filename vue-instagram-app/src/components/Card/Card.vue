<script setup lang="ts">
import { defineProps } from 'vue';

const { post } = defineProps<{
  post: { id: number; url: string; caption: string };
}>();

const { VITE_SUPABASE_URL } = import.meta.env;
</script>

<template>
  <a-card hoverable style="width: 500px" class="card">
    <template #cover>
      <img
        alt="example"
        :src="`${VITE_SUPABASE_URL}/storage/v1/object/public/${post.url}`"
      />
    </template>
    <a-card-meta :title="post.caption">
      <template #description>www.instagram.com</template>
    </a-card-meta>
  </a-card>
</template>

<style scoped>
.card {
  margin-top: 30px;
}
</style>
