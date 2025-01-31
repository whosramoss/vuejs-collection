<script setup>
import { ref, reactive } from 'vue';

const red = ref(0);
const green = ref(0);
const blue = ref(0);

// const color = ref({
//   red: 0,
//   green: 0,
//   blue: 0,
// });

const color = reactive({
  red: 0,
  green: 0,
  blue: 0,
});

const selectRandomColor = () => {
  // color.value.red = 10;
  // color.value.green = 123;
  // color.value.blue = 220;

  color.red = 10;
  color.green = 123;
  color.blue = 220;
};
</script>

<template>
  <main
    :style="{ background: `rgb(${color.red}, ${color.green}, ${color.blue})` }"
  >
    <div>
      <input v-model="color.red" type="number" placeholder="red" />
      <input v-model="color.green" type="number" placeholder="green" />
      <input v-model="color.blue" type="number" placeholder="blue" />
      <button @click="selectRandomColor()">Select random color</button>
    </div>
  </main>
</template>

<style scoped>
main {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

div {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
