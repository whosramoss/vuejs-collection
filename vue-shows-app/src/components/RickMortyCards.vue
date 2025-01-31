<script setup>
import axios from 'axios';
import {
  ref,
  watch,
  onMounted,
  onUpdated,
  onUnmounted,
  onBeforeMount,
} from 'vue';

import Card from './Card.vue';

const characters = ref([]);
const page = ref(1);

onMounted(async () => {
  const response = await axios('https://rickandmortyapi.com/api/character');
  characters.value = response.data.results;
});

// onUpdated(() => {
//   console.log('updated');
// });

// onUnmounted(() => {
//   console.log('unmounted');
// });

// onBeforeMount(() => {
//   console.log('before mount');
// });

watch(page, async () => {
  const response = await axios(
    `https://rickandmortyapi.com/api/character?page=${page.value}`
  );
  characters.value = response.data.results;
});
</script>

<template>
  <div class="container">
    <div v-if="characters.length" class="cards">
      {{ page }}
      <Card
        v-for="character in characters"
        :key="character.id"
        :image="character.image"
        :name="character.name"
      >
        <div class="cards spinner">
          <p>{{ character.location.name }}</p>
        </div>
      </Card>
    </div>
    <div v-else>
      <n-spin size="large" />
    </div>
    <div class="button-container">
      <button @click="page--">&lt</button>
      <button @click="page++">></button>
    </div>
  </div>
</template>

<style scoped>
.container {
  background-color: rgb(27, 26, 26);
  padding: 30px;
}
.cards {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  /* height: 700px; */
}
.cards h3 {
  font-weight: bold;
}
.cards p {
  font-size: 10px;
}
.jobs {
  display: flex;
  flex-wrap: wrap;
}
.button-container {
  display: flex;
  justify-content: center;
  padding-top: 30px;
}
.button-container button {
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  margin: 0 5px;
  cursor: pointer;
}
.spinner {
  display: flex;
  align-items: center;
  justify-content: center;
}

p {
  font-size: 10px;
}
</style>
