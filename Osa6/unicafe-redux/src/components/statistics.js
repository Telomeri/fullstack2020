import React from 'react'

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

//from the first round
const Statistics = ({reviews}) => {
  //some needed math stuff
  const total = reviews.good + reviews.ok + reviews.bad
  const average = (reviews.good*1 + reviews.bad*-1)/total
  const positive = reviews.good/total*100
  //if total = 0, show this message
  if (total === 0) {
    return (
      <div>
      <pre></pre>
      No feedback given
      </div>
    )
  }
  //otherwise show statistics, wrapped in a table
  return (
    <div>
    <h1>statistics</h1>
    <table>
      <tbody>
        <StatisticLine value = {reviews.good} text = {"good"}/>
        <StatisticLine value = {reviews.ok} text = {"neutral"}/>
        <StatisticLine value = {reviews.bad} text = {"bad"}/>
        <StatisticLine value = {total} text = {"total"}/>
        <StatisticLine value = {average} text = {"average"}/>
        <DisplayPercent value = {positive} text = {"positive"}/>
      </tbody>
    </table>
    </div>
    )
}

export default Statistics