import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { notificationDisplay } from '../reducers/notificationReducer'

const Anecdotes = () => {
    const anecdotes = useSelector(state => {
      if ( state.filter !== 'ALL') {
        return state.anecdote.filter(anecdote => 
          anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
      }
      else {
        return state.anecdote
      }
    })
    const dispatch = useDispatch()
  
    const vote = async (anecdote) => {
      await dispatch(addVote(anecdote))
      dispatch(notificationDisplay(`you voted '${anecdote.content}'`, 5))
    }

    anecdotes.sort(function (a, b) {
        return b.votes - a.votes
      })

    return (
        <div>
          {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
              </div>
            </div>
          )}
        </div>
      )
    }
export default Anecdotes