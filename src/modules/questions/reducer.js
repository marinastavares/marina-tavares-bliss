import { createReducer } from 'utils/redux'
import { OrderedMap, Record } from 'immutable'
import { Question } from 'models'
import humps from 'humps'

import { GET_QUESTIONS, GET_MORE_QUESTIONS, GET_QUESTION, UPDATE_QUESTION } from './actions'

const INITIAL_STATE = Record({
  results: new OrderedMap(),
  current: '',
  hasMore: true,
})()

const orderedQuestions = (payload) =>
  OrderedMap(payload.map((question) => [question.id, new Question(humps.camelizeKeys(question))]))

const questions = createReducer(INITIAL_STATE, {
  [GET_QUESTIONS.FULFILLED]: (state, { payload }) =>
    state.set('results', orderedQuestions(payload)),
  [GET_QUESTION.FULFILLED]: (state, { payload }) =>
    state
      .setIn(['results', payload.id], new Question(humps.camelizeKeys(payload)))
      .set('current', payload.id),
  [UPDATE_QUESTION.FULFILLED]: (state, { meta: { payload } }) =>
    state.setIn(['results', payload.id], new Question(humps.camelizeKeys(payload))),
  [GET_MORE_QUESTIONS.FULFILLED]: (state, { payload }) => {
    const firstQuestion = payload[0].id
    if (state.getIn(['results', firstQuestion])) {
      return state.set('hasMore', false)
    }
    return state.set('results', orderedQuestions(payload))
  },
})

export default questions
