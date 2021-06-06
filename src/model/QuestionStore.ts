import { AnswerOptionModel, ChoiceAnswerModel, ChoiceQuestionModel } from '@/model/ChoiceQuestionModel';
import MockedQuestionBackend from '@/service/MockedQuestionBackend';
import { Store, StoreOptions } from 'vuex';
import { QuestionModel } from './QuestionModel';

const QuestionStoreDefinition: StoreOptions<ChoiceQuestionModel> = {
    state: () => ({
        id: '',
        body: '',
        answer: {
            markCorrectness: false,
            selected: [''],
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
        answers: (state) => state.answer.answers,
        maxScore: (state) => state.maxScore,
        questionsCount: (state) => state.questionsCount,
        position: (state) => state.position,
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
        FETCH_QUESTIONS: (context, mockedQuestionBackend: MockedQuestionBackend) => {
            mockedQuestionBackend.getQuestionModel().then((questionModel) => {
                context.commit('SET_QUESTION', questionModel);
            });
        },
        CHECK_ANSWER: (context, mockedQuestionBackend: MockedQuestionBackend) => {
            mockedQuestionBackend
                .markQuestionAnswer({
                    selectedAnswerIds: [context.getters.selected],
                    id: context.getters.id,
                    score: 0,
                    maxScore: context.getters.maxScore,
                })
                .then((markedMockedQuestionModel) => {
                    console.log(markedMockedQuestionModel);
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
