import { ChoiceGivenAnswerModel, ChoiceQuestionModel } from '@/model/ChoiceQuestionModel';

export default class MockedQuestionBackend {
    getQuestionModel(): Promise<ChoiceQuestionModel> {
        return new Promise<ChoiceQuestionModel>((resolve) => {
            setTimeout(() => {
                const mockedQuestionModel: ChoiceQuestionModel = {
                    id: '1',
                    body: 'What is the capital city of Poland?',
                    answer: {
                        givenAnswer: {
                            selectedAnswerIds: [],
                            id: 'ga1',
                            score: null,
                            maxScore: null,
                            loading: false,
                        },
                        readonly: false,
                        answers: [
                            {
                                id: 'a1',
                                body: 'Paris',
                                selected: false,
                            },
                            {
                                id: 'a2',
                                body: 'Warsaw',
                                selected: false,
                            },
                            {
                                id: 'a3',
                                body: 'London',
                                selected: false,
                            },
                        ],
                        markCorrectness: false,
                    },
                    maxScore: 1,
                    position: 1,
                    questionsCount: 5,
                    loading: false,
                };
                resolve(mockedQuestionModel);
            }, 2000);
        });
    }

    markQuestionAnswer(givenAnswer: ChoiceGivenAnswerModel): Promise<ChoiceQuestionModel> {
        return new Promise<ChoiceQuestionModel>((resolve) => {
            setTimeout(() => {
                const markedMockedQuestionModel: ChoiceQuestionModel = {
                    id: '1',
                    body: 'What is the capital city of Poland?',
                    answer: {
                        readonly: true,
                        givenAnswer,
                        answers: [
                            {
                                id: 'a1',
                                body: 'Paris',
                                selected: givenAnswer.selectedAnswerIds.indexOf('a1') >= 0,
                                markCorrectness: true,
                                correct: false,
                                readonly: true,
                            },
                            {
                                id: 'a2',
                                body: 'Warsaw',
                                selected: givenAnswer.selectedAnswerIds.indexOf('a2') >= 0,
                                markCorrectness: true,
                                correct: true,
                                readonly: true,
                            },
                            {
                                id: 'a3',
                                body: 'London',
                                selected: givenAnswer.selectedAnswerIds.indexOf('a3') >= 0,
                                markCorrectness: true,
                                correct: false,
                                readonly: true,
                            },
                        ],
                        markCorrectness: false,
                    },
                    maxScore: 1,
                    position: 1,
                    questionsCount: 5,
                    loading: false,
                };
                resolve(markedMockedQuestionModel);
            }, 2000);
        });
    }
}
