import { combineReducers } from 'redux'

import loading from './loading/reducer'
import error from './error/reducer'

const appReducer = combineReducers({
  error,
  loading,
})

const rootReducer = (state, action) => appReducer(state, action)

export default rootReducer
