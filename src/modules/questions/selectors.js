import { GET_QUESTIONS } from './actions'

export const questionsSelector = (state) => state.questions.results.valueSeq()
export const currentQuestionSelector = (state) => state.questions.current

export const getQuestionsLoadingSelector = (state) => !!state.loading[GET_QUESTIONS]
