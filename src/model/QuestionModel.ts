export interface GivenAnswerModel {
    id: string;
    score: number | null;
    maxScore: number | null;
}

export interface AnswerModel<GA extends GivenAnswerModel> {
    readonly: boolean;
    markCorrectness: boolean;
    givenAnswer: GA;
}

export interface QuestionModel<A extends AnswerModel<GA>, GA extends GivenAnswerModel> {
    id: string | null;
    body: string;
    position: number;
    questionsCount: number;
    answer: A;
    maxScore: number | null;
    loading: boolean;
    locked: boolean;
}
