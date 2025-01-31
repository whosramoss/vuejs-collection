<script setup>
import { ref, watch, computed } from 'vue';
import { useRoute } from 'vue-router';

import quizes from '../data/quizes.json';
import Question from '../components/Question.vue';
import QuizHeader from '../components/QuizHeader.vue';
import Result from '../components/Result.vue';

const route = useRoute();
const quizId = Number(route.params.id);
const quiz = quizes.find((q) => q.id === quizId);

const currentQuestionIndex = ref(0);
const numberOfCorrectAnswers = ref(0);
const showResult = ref(false);

const questionStatus = computed(
  () => `${currentQuestionIndex.value}/${quiz.questions.length}`
);
const barPercentage = computed(
  () => `${(currentQuestionIndex.value / quiz.questions.length) * 100}%`
);

const onOptionSelected = (isCorrect) => {
  if (isCorrect) {
    numberOfCorrectAnswers.value++;
  }

  if (currentQuestionIndex.value + 1 === quiz.questions.length) {
    showResult.value = true;
  }

  currentQuestionIndex.value++;
};

// const questionStatus = ref(
//   `${currentQuestionIndex.value}/${quiz.questions.length}`
// );
// watch(currentQuestionIndex, () => {
//   questionStatus.value = `${currentQuestionIndex.value}/${quiz.questions.length}`;
// });

// watch(
//   () => currentQuestionIndex.value,
//   () => {
//     questionStatus.value = `${currentQuestionIndex.value}/${quiz.questions.length}`;
//   }
// );
</script>

<template>
  <div>
    <QuizHeader
      :questionStatus="questionStatus"
      :barPercentage="barPercentage"
    />
    <div>
      <Question
        v-if="!showResult"
        :question="quiz.questions[currentQuestionIndex]"
        @selectOption="onOptionSelected"
      />
      <Result
        v-else
        :quizQuestionLength="quiz.questions.length"
        :numberOfCorrectAnswers="numberOfCorrectAnswers"
      />
    </div>
  </div>
</template>
