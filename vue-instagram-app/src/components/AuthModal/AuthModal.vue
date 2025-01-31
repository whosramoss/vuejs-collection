<script setup lang="ts">
import { defineProps, reactive, ref } from 'vue';
import { storeToRefs } from 'pinia';

import { AuthType } from '../../types';
import { useUserStore } from '../../stores/user';

const { type } = defineProps<{
  type: AuthType;
}>();

const userStore = useUserStore();
const { errorMessage, loading, user } = storeToRefs(userStore);
const { handleSignup, handleLogin, clearErrorMessage } = userStore;

const userCredentials = reactive({
  email: '',
  password: '',
  username: '',
});
const visible = ref(false);

const toggleModal = (value: boolean) => {
  visible.value = value;
};

const clearCredentials = () => {
  userCredentials.email = '';
  userCredentials.password = '';
  userCredentials.username = '';
};

const handleOk = async () => {
  if (type === AuthType.LOGIN) {
    await handleLogin(userCredentials);
  } else {
    await handleSignup(userCredentials);
  }

  if (user.value) {
    toggleModal(false);
    clearCredentials();
    clearErrorMessage();
  }
};

const handleCancel = () => {
  toggleModal(false);
  clearCredentials();
  clearErrorMessage();
};
</script>

<template>
  <div>
    <a-button class="btn" type="primary" @click="toggleModal(true)"
      >{{ type }}
    </a-button>
    <a-modal v-model:visible="visible" :title="type" @ok="handleOk">
      <template #footer>
        <a-button key="back" @click="handleCancel">Cancel</a-button>
        <a-button
          key="submit"
          type="primary"
          :loading="loading"
          @click="handleOk"
          >Submit</a-button
        >
      </template>
      <div v-if="!loading" class="input-container">
        <a-input
          v-if="type === AuthType.SIGNIN"
          v-model:value="userCredentials.username"
          placeholder="Username"
          class="input"
        />
        <a-input
          v-model:value="userCredentials.email"
          placeholder="Email"
          class="input"
        />
        <a-input
          v-model:value="userCredentials.password"
          placeholder="Password"
          type="password"
          class="input"
        />
      </div>
      <div v-else class="spinner">
        <a-spin />
      </div>
      <a-typography-text v-if="errorMessage" type="danger">{{
        errorMessage
      }}</a-typography-text>
    </a-modal>
  </div>
</template>

<style scoped>
.btn {
  margin-left: 10px;
}

.spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
}

.input-container {
  height: 120px;
}

.input {
  margin-top: 4px;
}
</style>
