<template>
    <div class="flex-container">
        <aside class="aside aside-1"></aside>
        <aside class="aside aside-2"></aside>
        <div class="flex-child">
            <h3>Question {{ position }}/{{ questionsCount }}</h3>
            <div>
                <p>{{ body }}</p>
                <div v-for="answer in answers" :key="answer.id">
                    <input type="radio" @click="setSelected(answer.id)" :id="answer.id" name="action" :value="answer.id" :disabled="disabled" />
                    <label :class="[{ right: isRight(answer.id), markCorrectness: markCorrectness }]" :for="answer.id">{{ answer.body }}</label>
                    <br />
                </div>
                <button id="checkAnswerButton" @click="checkAnswer" :disabled="disabled">Check answer</button>
            </div>
        </div>
        <div class="flex-child flex-child2">
            <i>(max. score {{ maxScore }})</i>
        </div>
    </div>
</template>

<script lang="ts">
import MockedQuestionBackend from '@/service/MockedQuestionBackend';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SingleChoiceQuestion extends Vue {
    mockedQuestionBackend: MockedQuestionBackend = new MockedQuestionBackend();

    disabled = false;

    get position(): number {
        return this.$store.getters.position;
    }

    get questionsCount(): number {
        return this.$store.getters.questionsCount;
    }

    get maxScore(): number {
        return this.$store.getters.maxScore;
    }

    get body(): string {
        return this.$store.getters.body;
    }

    get answers(): string[] {
        return this.$store.getters.answers;
    }

    get markCorrectness(): boolean {
        return this.$store.getters.markCorrectness;
    }

    isRight(id: string): boolean {
        return this.$store.getters.right(id);
    }

    setSelected(id: string) {
        this.$store.dispatch('SET_SELECTED_ANSWER', id);
    }

    checkAnswer() {
        this.$store.dispatch('MARK_ANSWER', this.mockedQuestionBackend);
        this.disabled = true;
    }

    created() {
        this.$store.dispatch('FETCH_QUESTIONS', this.mockedQuestionBackend);
    }
}
</script>

<style lang="scss">
input[type='radio']:checked + label.markCorrectness {
    &.right {
        color: green;
    }
    & {
        color: red;
    }
}

.flex-container {
    display: flex;
    flex-flow: row wrap;
    text-align: center;
}

.flex-container > * {
    padding: 10px;
    flex: 1 100%;
}

.flex-child {
    text-align: left;
}

.flex-child2 {
    text-align: right;
}

@media all and (min-width: 600px) {
    .aside {
        flex: 1 0 0;
    }
}

@media all and (min-width: 800px) {
    .flex-child {
        flex: 3 0px;
    }
    .aside-1 {
        order: 1;
    }
    .flex-child {
        order: 2;
    }
    .aside-2 {
        order: 3;
    }
}
</style>
