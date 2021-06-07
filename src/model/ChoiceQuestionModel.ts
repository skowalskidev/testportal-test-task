import { AnswerModel, GivenAnswerModel, QuestionModel } from '@/model/QuestionModel';

export interface AnswerOptionModel {
    id: string;
    body: string;
    readonly?: boolean;
    selected?: boolean | null;
    score?: number | null;
    correct?: boolean | null;
    markCorrectness?: boolean | null;
}

export interface ChoiceAnswerModel extends AnswerModel<ChoiceGivenAnswerModel> {
    answers: AnswerOptionModel[];
}

export interface ChoiceGivenAnswerModel extends GivenAnswerModel {
    selectedAnswerIds: string[];
    loading: boolean,
}

export type ChoiceQuestionModel = QuestionModel<ChoiceAnswerModel, ChoiceGivenAnswerModel>;
