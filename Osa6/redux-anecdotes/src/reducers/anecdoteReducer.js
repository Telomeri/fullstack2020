
import anecService from '../services/anecdotes'

export const addVote = (anecdote) => {
  return async dispatch => {
    const changedAnecdote = { 
      ...anecdote, 
      votes : anecdote.votes + 1
    }
    const updatedAnec = await anecService.update(anecdote.id,changedAnecdote)
    dispatch({
    type: 'VOTE',
    data: updatedAnec,
  })
  }
}

export const addAnec = (data) => {
  return async dispatch => {
    const newAnec = await anecService.createNew(data)
    dispatch({
    type: 'ADD',
    data: newAnec,
  })
}}

export const initializeAnec = () => {
  return async dispatch => {
    const anecdotes = await anecService.getAll()
    dispatch({
    type: 'INIT',
    data: anecdotes,
  })
}}



const reducer = (state = [], action) => {
  //VOTE is similiar to changing importance
  switch (action.type) {
    case 'VOTE':
      return state.map(anec =>
        anec.id !== action.data.id ? anec : action.data 
      )
    case 'ADD':
      return [...state, action.data]
    case 'INIT':
        return action.data
  default: return state
  }
}

export default reducer