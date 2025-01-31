<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { storeToRefs } from 'pinia';

import { supabase } from '../../supabase';
import { useUserStore } from '../../stores/user';

const { addNewPost } = defineProps<{
  addNewPost: (post: any) => void;
}>();

const visible = ref(false);
const loading = ref(false);
const errorMessage = ref('');
const file = ref<any>(null);
const caption = ref('');
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const showModal = () => {
  visible.value = true;
};

const handleOk = async () => {
  if (file.value) {
    loading.value = true;
    errorMessage.value = '';

    const fileName = Math.floor(Math.random() * 1000000);

    const { data, error } = await supabase.storage
      .from('images')
      .upload('public' + fileName, file.value);

    if (error) {
      loading.value = false;
      return (errorMessage.value = 'Unable to upload image');
    }

    if (data) {
      await supabase.from('posts').insert({
        url: data.Key,
        caption: caption.value,
        owner_id: user.value?.id,
      });

      addNewPost({
        url: data.Key,
        caption: caption.value,
      });
    }
  }

  loading.value = false;
  visible.value = false;
  caption.value = '';
};

const handleUploadChange = async (e: any) => {
  if (e.target.files) {
    file.value = e.target.files[0];
  }
};
</script>

<template>
  <div>
    <a-button @click="showModal">Upload Photo</a-button>
    <a-modal v-model:visible="visible" title="Upload Photo" @ok="handleOk">
      <div v-if="!loading">
        <input type="file" @change="handleUploadChange" />
        <a-input
          v-model:value="caption"
          placeholder="Caption"
          :maxlength="50"
        />
        <a-typography-text v-if="errorMessage" type="danger">{{
          errorMessage
        }}</a-typography-text>
      </div>
      <div v-else class="spinner">
        <a-spin />
      </div>
    </a-modal>
  </div>
</template>

<style scoped>
input {
  margin-top: 10px;
}

.spinner {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
