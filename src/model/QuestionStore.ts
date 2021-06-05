import { ChoiceQuestionModel } from '@/model/ChoiceQuestionModel';
import { Store, StoreOptions } from 'vuex';

const QuestionStoreDefinition: StoreOptions<ChoiceQuestionModel> = {
    state: () => ({
        id: '',
        body: '',
        answer: {
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
        answers: (state) => state.answer.answers,
        maxScore: (state) => state.maxScore,
        questionsCount: (state) => state.questionsCount,
        position: (state) => state.position,
    },
    mutations: {
        setID(state, id) {
            state.id = id;
        },
        setBody(state, body) {
            state.body = body;
        },
        setAnswers(state, answers) {
            state.answer.answers = answers;
        },
        setMaxScore(state, maxScore) {
            state.maxScore = maxScore;
        },
        setQuestionsCount(state, questionsCount) {
            state.questionsCount = questionsCount;
        },
        setPosition(state, position) {
            state.position = position;
        },
    },
    actions: {
        // getQuestions() {},
    },
};

export default QuestionStoreDefinition;
