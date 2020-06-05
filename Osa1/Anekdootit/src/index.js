import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({title}) => <h1>{title}</h1>

const Button = ({clicked, text}) => (
  <button onClick = {clicked}>
    {text}
  </button>
)

//gives random anecdote and its current votes
const RandomizeAnec = (setSelected,selected,votes,setVotes) => {
  selected = (Math.round(Math.random() * (anecdotes.length-1)))
  setSelected(selected)
  ChangeVote(votes = points[selected], setVotes)
}

//sets current amount of votes
const ChangeVote = (votes,setVotes) => {
  setVotes(votes)
}

//adds a vote, updates it
const VoteAnec = (selected,votes, setVotes) =>{
  let copy = [...points]
  copy[selected] += 1
  points = [...copy]
  ChangeVote(votes = points[selected], setVotes)
}



const App = (props) => {
  //seperated into two different use states, one for getting current random anecdote
  //one  for getting the current votes from array points.
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(0)

  
  return (
    <div>
      <Header title = 'Anecdote of the day'/>
      <div>{props.anecdotes[selected]}</div>
      <div> has {votes} votes</div>
      <Button clicked = {() => VoteAnec(selected,votes,setVotes)} text = 'vote'/>
      <Button clicked = {() => RandomizeAnec(setSelected,selected,votes,setVotes)} text = 'next anecdote'/>
      <Header title = 'Anecdote with most votes'/>
      <div> {props.anecdotes[points.indexOf(Math.max(...points))]}</div>
      <div> has {[Math.max(...points)]} votes</div>
    </div>
    //Not the ideal way to do this, but It will do for now, not happy with
    //the amount of parameters I give to certain consts.
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

//this is the way I could get it to work, I don't know if this is a bad thing to do...
let points = new Array(anecdotes.length+1).join('0').split('').map(parseFloat)

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
