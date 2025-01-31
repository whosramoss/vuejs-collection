<script setup>
import { ref } from 'vue';

import GameOfThronesCardsSuspense from './components/GameOfThronesCardsSuspense.vue';
import RickMortyCards from './components/RickMortyCards.vue';
import Hero from './components/Hero.vue';
import PracticeSlot from './components/PracticeSlot.vue';

const isGot = ref(true);
</script>

<template>
  <main>
    <Hero :isGot="isGot" @selectShow="isGot = !isGot" />
    <!-- <GameOfThronesCardsSuspense v-if="isGot" />
    <RickMortyCards v-else /> -->
    <KeepAlive>
      <Component :is="isGot ? GameOfThronesCardsSuspense : RickMortyCards" />
    </KeepAlive>
    <!-- <PracticeSlot>
      <h1>hello</h1>
      <template #header>
        <div>
          <h2>This is a header</h2>
          <a href="">page 1</a>
          <a href="">page 2</a>
        </div>
      </template>
      <template #footer>
        <div>
          <h2>This is a footer</h2>
          <ul>
            <li>facebook</li>
            <li>twitter</li>
          </ul>
        </div>
      </template>
    </PracticeSlot> -->
  </main>
</template>
