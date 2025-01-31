<script setup>
import axios from 'axios';
import { ref, watch } from 'vue';

import Card from './Card.vue';

const from = ref(0);
const to = ref(8);
const characters = ref([]);

const response = await axios('https://thronesapi.com/api/v2/Characters');
characters.value = response.data.slice(from.value, to.value);

const nextPage = () => {
  to.value += 8;
  from.value += 8;
};

const backPage = () => {
  to.value -= 8;
  from.value -= 8;
};

watch(from, async () => {
  characters.value = response.data.slice(from.value, to.value);

  // const response = await axios('https://thronesapi.com/api/v2/Characters');
  // characters.value = response.data.slice(from.value, to.value);
});
</script>

<template>
  <div class="container">
    <div class="cards">
      <Card
        v-for="character in characters"
        :key="character.id"
        :image="character.imageUrl"
        :name="character.fullName"
      >
        <div>
          <p>{{ character.title }}</p>
        </div>
      </Card>
    </div>
    <div class="button-container">
      <button @click="backPage()">&lt</button>
      <button @click="nextPage()">></button>
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
  height: 700px;
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
