<template>
    <div class="flex-container-column">
        <aside class="aside aside-1"></aside>
        <aside class="aside aside-2"></aside>
        <div class="flex-container-column-child">
            <div class="flex-container-row">
                <div class="flex-container-row-child">
                    <h3>Question {{ position }}/{{ questionsCount }}</h3>
                </div>
                <div class="flex-container-row-child">
                    <i>(max. score {{ maxScore }})</i>
                </div>
            </div>
        </div>
        <div class="flex-container-column-child">
            {{ body }}
        </div>
        <div class="flex-container-column-child">
            <div class="answers" v-for="answer in answers" :key="answer.id">
                <input type="radio" @click="setSelected(answer.id)" :id="answer.id" name="action" :value="answer.id" :disabled="disabled" />
                <label :class="[{ right: isRight(answer.id), markCorrectness: markCorrectness }]" :for="answer.id">{{ answer.body }}</label>
            </div>
        </div>
        <div class="flex-container-column-child">
            <button id="checkAnswerButton" @click="checkAnswer" :disabled="disabled">Check answer</button>
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

.flex-container-column {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.flex-container-column-child {
    width: 40%;
    padding: 5px;
}

@media only screen and (max-width: 600px) {
    .flex-container-column-child {
        width: 100%;
    }
}

.flex-container-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

.flex-container-row-child {
}

.answers {
    padding: 5px;
}
</style>
