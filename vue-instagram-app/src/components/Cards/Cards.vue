<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';

import Card from '../Card/Card.vue';
import Observer from '../Observer.vue';
import { useUserStore } from '../../stores/user';
import { supabase } from '../../supabase';

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const posts = ref<{ id: number; url: string; caption: string }[]>([]);
const ownerIds = ref<number[]>([]);
const loading = ref(true);
const to = ref(1);
const reachEnd = ref(false);

const fetchData = async () => {
  const { data: followersData } = await supabase
    .from('followers')
    .select('following_id')
    .eq('follower_id', user.value?.id);

  ownerIds.value = followersData?.map(
    (f: { following_id: number }) => f.following_id
  )!;

  const { data } = await supabase
    .from('posts')
    .select()
    .in('owner_id', ownerIds.value)
    .range(0, to.value)
    .order('created_at', { ascending: false });

  posts.value = data as { id: number; url: string; caption: string }[];

  setTimeout(() => (loading.value = false), 1000);
};

const fetchNextSet = async () => {
  if (reachEnd.value) return;

  const { data } = await supabase
    .from('posts')
    .select()
    .in('owner_id', ownerIds.value)
    .range(to.value + 1, to.value + 3)
    .order('created_at', { ascending: false });

  posts.value.push(...(data as { id: number; url: string; caption: string }[]));

  to.value += 3;

  if (data?.length === 0) {
    reachEnd.value = true;
  }
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="cards__container">
    <Card v-for="post in posts" :key="post.id" :post="post" />
    <Observer v-if="!loading" @intersect="fetchNextSet" />
  </div>
</template>

<style scoped>
.cards__container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
