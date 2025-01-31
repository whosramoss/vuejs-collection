<script setup lang="ts">
import { onMounted, ref, watch, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';

import Container from '../UI/container.vue';
import UserBar from '../UserBar/UserBar.vue';
import UserProfile from '../UserProfile/UserProfile.vue';
import { supabase } from '../..//supabase';
import { useUserStore } from '../../stores/user';

const route = useRoute();
const userStore = useUserStore();
const { user: loggedInUser } = storeToRefs(userStore);
const { username } = route.params;

const user = ref<null | { id: string }>(null);
const posts = ref<any[]>([]);
const loading = ref(false);
const isFollowing = ref(false);
const userInfos = reactive<{
  posts: null | number;
  followers: null | number;
  following: null | number;
}>({
  posts: null,
  followers: null,
  following: null,
});

const addNewPost = (post: any) => {
  posts.value.unshift(post);
};

const updateIsFollowing = (follow: boolean) => {
  isFollowing.value = follow;
};

const fetchData = async () => {
  loading.value = true;

  const { data: userData } = await supabase
    .from('users')
    .select()
    .eq('username', username)
    .single();

  if (userData) {
    user.value = userData;

    const { data: postsData } = await supabase
      .from('posts')
      .select()
      .eq('owner_id', user?.value?.id);

    posts.value = postsData!;

    await fetchIsFollowing();

    await fetchUserInfos();

    userInfos.posts = posts.value.length;
  }

  loading.value = false;
};

const fetchIsFollowing = async () => {
  if (loggedInUser.value && loggedInUser.value.id !== user.value?.id) {
    const { data } = await supabase
      .from('followers')
      .select()
      .eq('follower_id', loggedInUser.value.id)
      .eq('following_id', user.value?.id)
      .single();

    if (data) {
      isFollowing.value = true;
    }
  }
};

const fetchUserInfos = async () => {
  const { count: followingCount } = await supabase
    .from('followers')
    .select('*', { count: 'exact' })
    .eq('following_id', user.value?.id);

  const { count: followerCount } = await supabase
    .from('followers')
    .select('*', { count: 'exact' })
    .eq('follower_id', user.value?.id);

  userInfos.followers = followerCount;
  userInfos.following = followingCount;
};

watch([loggedInUser, user], () => {
  if (loggedInUser.value && user.value) {
    fetchIsFollowing();
  }
});

onMounted(async () => {
  fetchData();
});
</script>

<template>
  <div class="about" v-if="!loading">
    <Container :styles="{ paddingTop: '75px' }">
      <UserBar
        :isFollowing="isFollowing"
        :profileUser="user"
        :addNewPost="addNewPost"
        :updateIsFollowing="updateIsFollowing"
        :userInfos="userInfos"
      />
      <UserProfile :posts="posts" />
    </Container>
  </div>
  <div v-else class="spinner">
    <a-spin />
  </div>
</template>

<style>
.spinner {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
