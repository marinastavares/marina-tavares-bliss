import { GET_QUESTIONS, GET_QUESTION, GET_MORE_QUESTIONS, UPDATE_QUESTION } from './actions'

export const questionsSelector = (state) => state.questions.results.valueSeq()
export const currentQuestionSelector = (state) => state.questions.current
export const hasMoreQuestionSelector = (state) => state.questions.hasMore
export const questionSelector = (state) =>
  state.questions.results.get(currentQuestionSelector(state))

export const getQuestionsLoadingSelector = (state) => !!state.loading[GET_QUESTIONS]
export const getQuestionLoadingSelector = (state) => !!state.loading[GET_QUESTION]
export const getMoreQuestionsLoadingSelector = (state) => !!state.loading[GET_MORE_QUESTIONS]
export const updateQuestionLoadingSelector = (state) => !!state.loading[UPDATE_QUESTION]
