<script setup lang="ts">
import { ref, computed } from 'vue';

import Card from './components/Card.vue';
import { type Invitee, GENDER } from './type';

const name = ref<string>('');
const gender = ref(GENDER.MALE);
// const gender = ref<'male' | 'female'>('male');
const invitees = ref<Invitee[]>([]);

const addInvitee = (): void => {
  if (name.value) {
    invitees.value.push({
      id: Math.floor(Math.random() * 1000000),
      name: name.value,
      gender: gender.value,
    });

    name.value = '';
    gender.value = GENDER.MALE;
  }
};

const count = computed<{ female: number; male: number }>(() => {
  return invitees.value.reduce(
    (acc, curr) => {
      if (curr.gender === GENDER.MALE) {
        return { ...acc, male: acc.male + 1 };
      }

      return { ...acc, female: acc.female + 1 };
    },
    { female: 0, male: 0 }
  );
});
</script>

<template>
  <main>
    <div>
      <h1>People invited to my party</h1>
      <div class="input-container">
        <input
          v-model="name"
          @keypress.enter="addInvitee()"
          type="text"
          placeholder="Name..."
        />
        <select v-model="gender">
          <option :value="GENDER.MALE">Male</option>
          <option :value="GENDER.FEMALE">Female</option>
        </select>
      </div>
      <div class="cards-container">
        <Card v-for="invitee in invitees" :invitee="invitee" />
      </div>
      <div>
        <p>Females - {{ count.female }}</p>
        <p>Males - {{ count.male }}</p>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: antiquewhite;
  color: black;
}

input,
select {
  width: 100%;
  padding: 5px;
  margin-bottom: 2px;
}
</style>
