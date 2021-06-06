<template>
    <single-choice-question />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SingleChoiceQuestion from '@/components/SingleChoiceQuestion.vue';
import { ChoiceQuestionModel } from '@/model/ChoiceQuestionModel';
import MockedQuestionBackend from '@/service/MockedQuestionBackend';

@Component({
    components: {
        SingleChoiceQuestion,
    },
})
export default class App extends Vue {
    mockedQuestionBackend: MockedQuestionBackend = new MockedQuestionBackend();

    checkAnswer() {
        // TODO: pass check ans req from child up here
        this.$store.dispatch('CHECK_ANSWER');
    }

    created() {
        this.$store.dispatch('FETCH_QUESTIONS', this.mockedQuestionBackend);
    }
}
</script>

<style lang="scss"></style>
