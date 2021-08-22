import { createReducer } from 'utils/redux'
import { Record } from 'immutable'

import { GET_HEALTH_CHECK } from './actions'

const INITIAL_STATE = Record({
  status: undefined,
})()

const healthCheck = createReducer(INITIAL_STATE, {
  [GET_HEALTH_CHECK.FULFILLED]: (state, { payload }) => state.set('status', payload.status),
  [GET_HEALTH_CHECK.REJECTED]: (state) => state.set('status', 'error'),
})

export default healthCheck
