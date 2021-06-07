<template>
    <div>
        <div v-if="questionLoading" class="flex-container-column">
            <div class="flex-container-column-child">
                <div class="flex-container-row">
                    <div class="flex-container-row-child">
                        <h3><span class="skeleton-box" style="width:100px;"></span></h3>
                    </div>
                    <div class="flex-container-row-child">
                        <span class="skeleton-box" style="width:100px;"></span>
                    </div>
                </div>
            </div>
            <div class="flex-container-column-child">
                <span class="skeleton-box" style="width:200px;"></span>
            </div>
            <div class="flex-container-column-child">
                <div class="answers">
                    <span class="skeleton-box" style="width:80px;"></span>
                </div>
                <div class="answers">
                    <span class="skeleton-box" style="width:80px;"></span>
                </div>
                <div class="answers">
                    <span class="skeleton-box" style="width:80px;"></span>
                </div>
            </div>
            <div class="flex-container-column-child">
                <span class="skeleton-box" style="width:100px;height:20px;"></span>
            </div>
        </div>
        <div v-if="!questionLoading" class="flex-container-column">
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
                    <div v-if="givenAnswerLoading" class="lds-ring">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
            <div class="flex-container-column-child">
                <button id="checkAnswerButton" @click="checkAnswer" :disabled="disabled">Check answer</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SingleChoiceQuestion extends Vue {
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

    get givenAnswerLoading(): boolean {
        return this.$store.getters.givenAnswerLoading;
    }

    get questionLoading(): boolean {
        return this.$store.getters.questionLoading;
    }

    isRight(id: string): boolean {
        return this.$store.getters.right(id);
    }

    setSelected(id: string) {
        this.$store.dispatch('SET_SELECTED_ANSWER', id);
    }

    checkAnswer() {
        this.$store.dispatch('MARK_ANSWER');
        this.disabled = true;
    }

    created() {
        this.$store.dispatch('FETCH_QUESTIONS');
    }
}
</script>

<style lang="scss">
/*
    Answer Red and Green Text
 */

input[type='radio']:checked + label.markCorrectness {
    &.right {
        color: green;
    }
    & {
        color: red;
    }
}

/*
    Flex
 */

.flex-container-column {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.flex-container-column-child {
    width: 40%;
    margin: 5px;
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

// .flex-container-row-child {
// }

.answers {
    margin: 5px;
}

/*
    Circle Loader
 */

.lds-ring {
    visibility: hidden;
}

input[type='radio']:checked + label + .lds-ring {
    visibility: visible;
}

.lds-ring {
    display: inline-block;
    position: relative;
    width: 15px;
    height: 15px; // base * 10
}

.lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 16px;
    height: 16px; // base * 8
    margin: 2px; // base
    border: 2px solid #cef;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #cef transparent transparent transparent;
}

.lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
}

.lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
}

.lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
}

@keyframes lds-ring {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

/*
    Skeleton Loader
 */
.skeleton-box {
    display: inline-block;
    height: 1em;
    position: relative;
    overflow: hidden;
    background-color: #dddbdd;

    &::after {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        transform: translateX(-100%);
        background-image: linear-gradient(90deg, rgba(#fff, 0) 0, rgba(#fff, 0.2) 20%, rgba(#fff, 0.5) 60%, rgba(#fff, 0));
        animation: shimmer 2s infinite;
        content: '';
    }

    @keyframes shimmer {
        100% {
            transform: translateX(100%);
        }
    }
}
</style>
