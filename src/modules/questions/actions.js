import { defineAction } from 'redux-define'
import * as questionsService from 'services/questions'

// eslint-disable-next-line import/no-cycle
import { questionSelector } from './selectors'

const REQUEST = ['PENDING', 'FULFILLED', 'REJECTED', 'COUNT']

export const GET_QUESTIONS = defineAction('GET_QUESTIONS', REQUEST)
export const GET_QUESTION = defineAction('GET_QUESTION', REQUEST)
export const GET_MORE_QUESTIONS = defineAction('GET_MORE_QUESTIONS', REQUEST)
export const UPDATE_QUESTION = defineAction('UPDATE_QUESTION', REQUEST)

export const getQuestions = (params) => (dispatch) => {
  dispatch({
    type: GET_QUESTIONS.ACTION,
    payload: questionsService.getQuestions(params),
  })
}

export const getQuestion = (questionId) => (dispatch) => {
  dispatch({
    type: GET_QUESTION.ACTION,
    payload: questionsService.getQuestion(questionId),
    meta: { questionId },
  })
}

export const updateQuestion = (choice) => (dispatch, getState) => {
  // Updating only the voted choice
  const payload = {
    ...questionSelector(getState()).toJS(),
  }
  payload.choices = payload.choices.map((value) => {
    if (value.choice === choice) {
      return { ...value, votes: value.votes + 1 }
    }
    return value
  })
  dispatch({
    type: UPDATE_QUESTION.ACTION,
    payload: questionsService.updateQuestion(getState().questions.current)(payload),
    meta: { payload },
  })
}

export const getMoreQuestions = (params) => (dispatch, getState) => {
  dispatch({
    type: GET_MORE_QUESTIONS.ACTION,
    payload: questionsService.getQuestions({
      ...params,
      offset: getState().questions.results.size,
    }),
  })
}
