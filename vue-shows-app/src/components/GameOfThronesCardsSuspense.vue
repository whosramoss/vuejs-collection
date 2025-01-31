<script setup>
import GameOfThronesCards from './GameOfThronesCards.vue';
</script>

<template>
  <Suspense>
    <template #default>
      <GameOfThronesCards />
    </template>
    <template #fallback>
      <div class="cards">
        <n-spin size="large" />
      </div>
    </template>
  </Suspense>
</template>

<style scoped>
.cards {
  height: 700px;
  background-color: rgb(27, 26, 26);
}
</style>
