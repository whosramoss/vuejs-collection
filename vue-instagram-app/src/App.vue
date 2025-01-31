<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';

import Nav from './components/Nav/Nav.vue';
import { useUserStore } from './stores/user';

const { getUser } = useUserStore();

onMounted(() => {
  getUser();
});
</script>

<template>
  <ALayout class="layout">
    <Nav />
    <RouterView />
  </ALayout>
</template>

<style>
.layout {
  background-color: white;
}
</style>
