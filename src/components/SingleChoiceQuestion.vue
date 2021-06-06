<template>
    <section>
        <div style="width: 100%; overflow: hidden;">
            <h3 style="width: 300px; float: left;">Question {{ position }}/{{ questionsCount }}</h3>
            <div style="margin-left: 320px; vertical-align: bottom;">
                <i>(max. score {{ maxScore }})</i>
            </div>
        </div>
        <p>{{ body }}</p>
        <div v-for="answer in answers" :key="answer.id">
            <input type="radio" @click="setSelected(answer.id)" :id="answer.id" name="action" :value="answer.id" />
            <label :class="[{ selected: isForSelected(answer.id), right: isRight(answer.id), wrong: !isRight(answer.id) }]" :for="answer.id">{{
                answer.body
            }}</label>
            <br />
        </div>
        <button id="checkAnswerButton" @click="checkAnswer">Check answer</button>
    </section>
</template>

<script lang="ts">
import MockedQuestionBackend from '@/service/MockedQuestionBackend';
import {
    Component, Prop, PropSync, Vue,
} from 'vue-property-decorator';

@Component
export default class SingleChoiceQuestion extends Vue {
    mockedQuestionBackend: MockedQuestionBackend = new MockedQuestionBackend();

    checked = false;

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

    get id(): number {
        return this.$store.getters.id;
    }

    get selectedIndex(): number {
        return this.$store.getters.selectedIndex;
    }

    getselectedID(index: number): string {
        return this.$store.getters.selectedID(index);
    }

    isSelected(id: string): string {
        return this.$store.getters.selected(id);
    }

    isRight(id: string): boolean {
        return this.$store.getters.right(id);
    }

    isForSelected(id: string): boolean {
        if (this.checked) {
            return id === this.getselectedID(this.selectedIndex);
        }
        return false;
    }

    setSelected(id: string) {
        this.$store.dispatch('SET_SELECTED_ANSWER', id);
    }

    checkAnswer() {
        this.$store.dispatch('MARK_ANSWER', this.mockedQuestionBackend);
        this.checked = true;
    }

    created() {
        this.$store.dispatch('FETCH_QUESTIONS', this.mockedQuestionBackend);
    }
}
</script>

<style lang="scss">
label {
    &.selected {
        &.right {
            color: green;
        }
        &.wrong {
            color: red;
        }
    }
}
</style>
