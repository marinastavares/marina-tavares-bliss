import { createReducer } from 'utils/redux'
import { OrderedMap, Record } from 'immutable'
import { Question } from 'models'
import humps from 'humps'

import { GET_QUESTIONS } from './actions'

const INITIAL_STATE = Record({
  results: new OrderedMap(),
  current: '',
})()

const orderedQuestions = (payload) =>
  OrderedMap(payload.map((question) => [question.id, new Question(humps.camelizeKeys(question))]))

const questions = createReducer(INITIAL_STATE, {
  [GET_QUESTIONS.FULFILLED]: (state, { payload }) =>
    state.set('results', orderedQuestions(payload)),
})

export default questions
