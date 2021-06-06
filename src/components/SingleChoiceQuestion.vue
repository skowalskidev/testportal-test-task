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
            <label :for="answer.id">{{ answer.body }}</label>
            <br />
        </div>
        <button id="checkAnswerButton" @click="checkAnswer">Check answer</button>
    </section>
</template>

<script lang="ts">
import {
    Component, Prop, PropSync, Vue,
} from 'vue-property-decorator';

@Component
export default class SingleChoiceQuestion extends Vue {
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

    setSelected(value: string) {
        // this.$emit('selected', value);
        this.$store.dispatch('SET_SELECTED_ANSWER', value);
    }

    checkAnswer() {
        console.log('check answer');
    }
}
</script>

<style lang="scss"></style>
