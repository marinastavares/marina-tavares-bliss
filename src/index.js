import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import promise from 'redux-promise-middleware'
import rootReducer from 'modules/reducer'

import reportWebVitals from './reportWebVitals'
import App from './App'

const errorMiddleware = () => (next) => (action) => {
  const result = next(action)

  if (!(result instanceof Promise)) {
    return action
  }

  return result.catch(() => {})
}
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...[thunk, errorMiddleware, promise], logger)),
)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
