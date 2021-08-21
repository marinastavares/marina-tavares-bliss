import { defineAction } from 'redux-define'
import * as questionsService from 'services/questions'

const REQUEST = ['PENDING', 'FULFILLED', 'REJECTED', 'COUNT']

export const GET_QUESTIONS = defineAction('GET_QUESTIONS', REQUEST)

export const getQuestions = (params) => (dispatch) => {
  dispatch({
    type: GET_QUESTIONS.ACTION,
    payload: questionsService.getQuestions(params),
  })
}
