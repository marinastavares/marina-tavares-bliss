import { GET_QUESTIONS, GET_MORE_QUESTIONS } from './actions'

export const questionsSelector = (state) => state.questions.results.valueSeq()
export const currentQuestionSelector = (state) => state.questions.current
export const hasMoreQuestionSelector = (state) => state.questions.hasMore

export const getQuestionsLoadingSelector = (state) => !!state.loading[GET_QUESTIONS]
export const getMoreQuestionsLoadingSelector = (state) => !!state.loading[GET_MORE_QUESTIONS]
