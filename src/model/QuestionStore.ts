import { AnswerOptionModel, ChoiceAnswerModel, ChoiceQuestionModel } from '@/model/ChoiceQuestionModel';
import MockedQuestionBackend from '@/service/MockedQuestionBackend';
import { Store, StoreOptions } from 'vuex';
import { QuestionModel } from './QuestionModel';

const QuestionStoreDefinition: StoreOptions<ChoiceQuestionModel> = {
    state: () => ({
        id: '',
        body: '',
        answer: {
            givenAnswer: {
                selectedAnswerIds: [],
                id: '',
                score: null,
                maxScore: null,
            },
            markCorrectness: false,
            answers: [],
            readonly: false,
        },
        maxScore: null,
        questionsCount: 0,
        position: 0,
    }),
    getters: {
        id: (state) => state.id,
        body: (state) => state.body,
        selectedAnswerIds: (state) => state.answer.givenAnswer.selectedAnswerIds,
        answers: (state) => state.answer.answers,
        maxScore: (state) => state.maxScore,
        questionsCount: (state) => state.questionsCount,
        position: (state) => state.position,
        selectedIndex: (state) => state.answer.answers.findIndex((obj) => obj.selected === true),
        selectedID: (state) => (index: number) => state.answer.answers[index].id,
        selected: (state) => (id: string) => state.answer.answers[state.answer.answers.findIndex((obj) => obj.id === id)].selected,
        right: (state) => (id: string) => state.answer.answers[state.answer.answers.findIndex((obj) => obj.id === id)].correct,
    },
    mutations: {
        // setID(state, id) {
        //     state.id = id;
        //     console.log('Store ID has been set');
        // },
        // setBody(state, body) {
        //     state.body = body;
        // },
        TOGGLE_SELECTED: (state: ChoiceQuestionModel, payload: { index: number; selected: boolean }) => {
            state.answer.answers[payload.index].selected = payload.selected;
            // Find the index of the element in the array (-1 if it doesn't exist)
            const index = state.answer.givenAnswer.selectedAnswerIds.indexOf(state.answer.answers[payload.index].id, 0);
            if (payload.selected) {
                // Only add the item if it's not already inside
                if (index === -1) {
                    // Add the selected element to the array
                    state.answer.givenAnswer.selectedAnswerIds.push(state.answer.answers[payload.index].id);
                }
            } else if (index > -1) {
                // Remove the unselected element from the array
                state.answer.givenAnswer.selectedAnswerIds.splice(index, 1);
            }
        },
        // setMaxScore(state, maxScore) {
        //     state.maxScore = maxScore;
        // },
        // setQuestionsCount(state, questionsCount) {
        //     state.questionsCount = questionsCount;
        // },
        // setPosition(state, position) {
        //     state.position = position;
        // },
        SET_QUESTION: (state: ChoiceQuestionModel, payload: ChoiceQuestionModel) => {
            Object.assign(state, payload);
        },
    },
    actions: {
        FETCH_QUESTIONS: async (context, mockedQuestionBackend: MockedQuestionBackend) => {
            mockedQuestionBackend.getQuestionModel().then((questionModel) => {
                context.commit('SET_QUESTION', questionModel);
            });
        },
        MARK_ANSWER: (context, mockedQuestionBackend: MockedQuestionBackend) => {
            mockedQuestionBackend
                .markQuestionAnswer({
                    selectedAnswerIds: context.getters.selectedAnswerIds,
                    id: context.getters.id,
                    score: 0,
                    maxScore: context.getters.maxScore,
                })
                .then((markedMockedQuestionModel) => {
                    context.commit('SET_QUESTION', markedMockedQuestionModel);
                });
        },
        SET_SELECTED_ANSWER: (context, answerID: string) => {
            const answers = context.getters.answers;
            for (let i = 0; i < answers.length; i += 1) {
                const answer: AnswerOptionModel = answers[i];
                if (answerID === answer.id) {
                    context.commit('TOGGLE_SELECTED', { index: i, selected: true });
                } else {
                    context.commit('TOGGLE_SELECTED', { index: i, selected: false });
                }
            }
        },
    },
};

export default QuestionStoreDefinition;
