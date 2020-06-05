import React, { useState } from 'react'
import ReactDOM from 'react-dom'

//addds a header
const Header = ({title}) => <h1>{title}</h1>

const Button = ({giveReview, text}) => (
  <button onClick = {giveReview}>
    {text}
  </button>
)

//adds a review 
const AddReview = (review, setReview) => setReview(review + 1)

const StatisticLine = ({value, text}) =>(
    //define row, and its contents 
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
 )

const DisplayPercent  = ({value, text}) => (
  //define row, and its contents (with a %)
<tr>
  <td>{text}</td>
  <td>{value}</td>
  <td>%</td>
</tr>
)

const Statistics = ({reviews}) => {
  //some needed math stuff
  const total = reviews[0] + reviews[1] + reviews[2]
  const average = (reviews[0]*1 + reviews[1]*0 + reviews[2]*-1)/total
  const positive = reviews[0]/total*100
  //if total = 0, show this message
  if (total === 0) {
    return (
      <div>No feedback given</div>
    )
  }
  //otherwise show statistics, wrapped in a table
  return (
    <table>
      <tbody>
        <StatisticLine value = {reviews[0]} text = {"good"}/>
        <StatisticLine value = {reviews[1]} text = {"neutral"}/>
        <StatisticLine value = {reviews[2]} text = {"bad"}/>
        <StatisticLine value = {total} text = {"total"}/>
        <StatisticLine value = {average} text = {"average"}/>
        <DisplayPercent value = {positive} text = {"positive"}/>
      </tbody>
    </table>
    )
}


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const titles = ['give feedback', 'statistics']
  //renders headers, adds the buttons and passes the job to statistics
return (
    <div>
      <Header title = {titles[0]}/>
      <Button giveReview = {() => AddReview(good,setGood)} text = 'good'/>
      <Button giveReview = {() => AddReview(neutral,setNeutral)} text = 'neutral'/>
      <Button giveReview = {() => AddReview(bad,setBad)} text = 'bad'/>
      <Header title = {titles[1]}/>
      <Statistics reviews = {[good,neutral,bad]}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)