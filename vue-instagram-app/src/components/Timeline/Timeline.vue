<script setup lang="ts">
import { storeToRefs } from 'pinia';

import Cards from '../Cards/Cards.vue';
import Container from '../UI/container.vue';
import { useUserStore } from '../../stores/user';

const userStore = useUserStore();
const { user, loadingUser } = storeToRefs(userStore);
</script>

<template>
  <Container :styles="{}">
    <div class="cards__container" v-if="!loadingUser">
      <Cards v-if="user" />
      <div v-else>
        <h3>Log in to see posts</h3>
      </div>
    </div>
    <div v-else class="spinner">
      <a-spin />
    </div>
  </Container>
</template>

<style scoped>
.cards__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
}

.spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
