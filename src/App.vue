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
export default class App extends Vue {}
</script>

<style lang="scss"></style>
