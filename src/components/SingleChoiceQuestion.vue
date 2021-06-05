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
            <input type="radio" :id="'r' + answer.id" name="action" :value="answer.id" @click="clicked(answer.id)" />
            <label :id="answer.id" :for="'r' + answer.id">{{ answer.body }}</label>
            <br />
        </div>
        <button id="checkAnswerButton" @click="checkAnswer">Check answer</button>
    </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ChoiceQuestionModel } from '@/model/ChoiceQuestionModel';
import MockedQuestionBackend from '@/service/MockedQuestionBackend';

@Component
export default class SingleChoiceQuestion extends Vue {
    mockedQuestionBackend: MockedQuestionBackend = new MockedQuestionBackend();

    selectedAnswer: string;

    clicked(value: string) {
        this.selectedAnswer = value;
    }

    choiceQuestionModel: ChoiceQuestionModel;

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

    getQuestion() {
        // get rid of this example code below and rewrite this component so it is using Vuex store
        this.mockedQuestionBackend.getQuestionModel().then((value) => {
            this.choiceQuestionModel = value;
            this.$store.commit('setBody', value.body);
            this.$store.commit('setAnswers', value.answer.answers);
            this.$store.commit('setMaxScore', value.maxScore);
            this.$store.commit('setQuestionsCount', value.questionsCount);
            this.$store.commit('setPosition', value.position);
        });
    }

    checkAnswer() {
        this.mockedQuestionBackend
            .markQuestionAnswer({
                selectedAnswerIds: [this.selectedAnswer],
                id: this.$store.state.id,
                score: 0,
                maxScore: this.$store.state.maxScore,
            })
            .then((value) => {
                const items = value.answer.answers;
                for (let i = 0; i < items.length; i += 1) {
                    if (this.selectedAnswer === items[i].id) {
                        if (items[i].correct) {
                            if (document.getElementById(this.selectedAnswer) !== null) {
                                document.getElementById(this.selectedAnswer)!.style.color = 'green';
                            }
                        } else if (document.getElementById(this.selectedAnswer) !== null) {
                            document.getElementById(this.selectedAnswer)!.style.color = 'red';
                        }
                    }
                    if (document.getElementById(`r${items[i].id}`) !== null) {
                        (document.getElementById(`r${items[i].id}`) as any)!.disabled = true;
                    }
                }
                if (document.getElementById('checkAnswerButton') !== null) {
                    (document.getElementById('checkAnswerButton') as any)!.disabled = true;
                }
            });
    }

    created() {
        this.getQuestion();
    }
}
</script>

<style lang="scss"></style>
