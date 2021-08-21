import { combineReducers } from 'redux'

import loading from './loading/reducer'
import error from './error/reducer'
import questions from './questions/reducer'

const appReducer = combineReducers({
  error,
  loading,
  questions,
})

const rootReducer = (state, action) => appReducer(state, action)

export default rootReducer
