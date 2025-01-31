<script setup>
import { ref } from 'vue';

const showText = ref(true);
const names = ref(['Selena Damo', 'Kevin Johnstone']);
const nameInput = ref('');

const addInvitee = () => {
  names.value.unshift(nameInput.value);
  nameInput.value = '';
};

const removeInvitee = (invitee) => {
  names.value = names.value.filter((name) => name !== invitee);
};
</script>

<template>
  <main>
    <!-- <div class="container">
      <Transition name="fade">
        <h1 v-if="showText">Hello World</h1>
        <h1 v-else>Goodbye World</h1>
      </Transition>
    </div>
    <button @click="showText = !showText">toggle</button> -->
    <div class="container">
      <input
        type="text"
        placeholder="Add person to invite..."
        v-model="nameInput"
        @keypress.enter="addInvitee"
      />
      <ul>
        <TransitionGroup name="invitees">
          <li v-for="name in names" :key="name" @click="removeInvitee(name)">
            {{ name }}
          </li>
        </TransitionGroup>
      </ul>
    </div>
  </main>
</template>

<style scope>
/* .fade-enter-from {
  opacity: 0;
}

.fade-enter-to {
  opacity: 1;
}

.fade-enter-active {
  transition: all 1s ease;
}

.fade-leave-from {
  opacity: 1;
}

.fade-leave-to {
  opacity: 0;
}

.fade-leave-active {
  transition: all 1s ease;
}

.container {
  position: relative;
}

h1 {
  position: absolute;
  white-space: nowrap;
}

button {
  margin-top: 50px;
} */

.container {
  max-width: 300px;
  margin: 0 auto;
}

.container input {
  width: 100%;
  border-radius: 5px;
  border: 1px solid wheat;
  padding: 10px;
  margin-bottom: 20px;
}

ul {
  display: inline;
  list-style: none;
  margin: 0px;
  padding: 0px;
}

li {
  list-style: none;
  widows: 300px;
  border-radius: 5px;
  padding: 5px 10px;
  margin-top: 10px;
  text-align: center;
  cursor: pointer;
  box-shadow: 1px 1px 10px rgb(255, 255, 255, 0.12);
}

.invitees-enter-from {
  opacity: 0;
  transform: scale(0.5);
}

.invitees-enter-to {
  opacity: 1;
  transform: scale(1);
}

.invitees-enter-active {
  transition: all 0.5s ease;
}

.invitees-leave-from {
  opacity: 1;
  transform: scale(1);
}

.invitees-leave-to {
  opacity: 0;
  transform: scale(0);
}

.invitees-leave-active {
  transition: all 0.5s ease;
}

.invitees-move {
  transition: all 0.5s ease;
}
</style>
