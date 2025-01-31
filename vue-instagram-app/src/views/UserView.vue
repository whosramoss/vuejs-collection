<script setup lang="ts">
import User from '@/components/User/User.vue';
</script>

<template>
  <User :key="$route.params.username" />
</template>

<style></style>
