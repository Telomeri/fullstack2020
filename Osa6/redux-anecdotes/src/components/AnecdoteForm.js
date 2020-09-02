import React from 'react'
import { connect } from 'react-redux' 
import { addAnec } from '../reducers/anecdoteReducer'
import { notificationDisplay } from '../reducers/notificationReducer'

//using connect
const NewAnec = (props) => {
  
  const createAnec = async (event) => {
    event.preventDefault()
    const content = event.target.anec.value
    event.target.anec.value = ''
    await props.addAnec(content)
    props.notificationDisplay(`you added '${content}'`, 5)
  }

  return (
    <div>
    <h1>Create new</h1>
    <form onSubmit={createAnec}>
      <input name="anec" />
      <button type="submit">add</button>
    </form>
    </div>
  )
}

const mapDispatchToProps = {
  addAnec,
  notificationDisplay,
}

const ConnectedNewAnec = connect(
  null,
  mapDispatchToProps
  )(NewAnec)
export default ConnectedNewAnec
