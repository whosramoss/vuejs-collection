<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { computed, defineProps } from 'vue';

import { useUserStore } from '../../stores/user';
import { supabase } from '../../supabase';
import UploadPhoto from '../UploadPhoto/UploadPhoto.vue';

const { isFollowing, profileUser, addNewPost, updateIsFollowing } =
  defineProps<{
    isFollowing: boolean;
    profileUser: {
      id: string;
    } | null;
    addNewPost: (post: any) => void;
    updateIsFollowing: (follow: boolean) => void;
    userInfos: {
      posts: null | number;
      followers: null | number;
      following: null | number;
    };
  }>();

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const route = useRoute();

const { username } = route.params;

const followUser = async () => {
  updateIsFollowing(true);

  await supabase.from('followers').insert({
    follower_id: user.value?.id,
    following_id: profileUser?.id,
  });
};

const unfollowUser = async () => {
  updateIsFollowing(false);

  await supabase
    .from('followers')
    .delete()
    .eq('follower_id', user.value?.id)
    .eq('following_id', profileUser?.id);
};

const isMyProfile = computed(() => {
  if (!user.value) return false;

  return user.value.username === username;
});
</script>

<template>
  <div class="container">
    <div class="text-container">
      <div class="name-container">
        <a-typography-title :level="2">{{ username }}</a-typography-title>
        <div v-if="user">
          <UploadPhoto v-if="isMyProfile" :addNewPost="addNewPost" />
          <div v-else>
            <a-button v-if="!isFollowing" @click="followUser">Follow</a-button>
            <a-button v-else @click="unfollowUser">Following</a-button>
          </div>
        </div>
      </div>
      <div class="stats-container">
        <a-typography-title :level="5"
          >{{ userInfos.posts }} posts</a-typography-title
        >
        <a-typography-title :level="5"
          >{{ userInfos.followers }} followers</a-typography-title
        >
        <a-typography-title :level="5"
          >{{ userInfos.following }} following</a-typography-title
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 75px;
}

.text-container {
}

.stats-container {
  display: flex;
  align-items: center;
}

.stats-container h5 {
  margin: 0;
  padding: 0;
  margin-right: 30px;
}

.name-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.name-container input {
  margin-top: 3px;
  margin-left: 90px;
}
</style>
