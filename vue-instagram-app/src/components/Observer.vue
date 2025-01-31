<script setup lang="ts">
import { ref, onMounted, defineEmits } from 'vue';

const emit = defineEmits(['intersect']);

const observer = ref<null | IntersectionObserver>(null);
const root = ref<Element | null>(null);

onMounted(() => {
  observer.value = new IntersectionObserver(([entry]) => {
    if (entry && entry.isIntersecting) {
      // fetch more data
      emit('intersect');
    }
  });

  observer.value.observe(root.value as Element);
});
</script>

<template>
  <div class="observer" ref="root"></div>
</template>

<style scoped>
.observer {
  width: 100%;
  height: 30px;
}
</style>
