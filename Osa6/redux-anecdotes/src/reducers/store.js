import { createStore, combineReducers, applyMiddleware } from 'redux'
import anecdoteReducer from './anecdoteReducer'
import notificationReducer from './notificationReducer'
import filterReducer from './filterReducer'
import thunk from 'redux-thunk'

import { composeWithDevTools } from 'redux-devtools-extension'


const reducer = combineReducers({
    anecdote: anecdoteReducer,
    notification: notificationReducer,
    filter: filterReducer
  })

const store = createStore(
    reducer,
    composeWithDevTools(
      applyMiddleware(thunk)
    )
  )

  export default store