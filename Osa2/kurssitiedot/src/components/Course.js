import React from 'react'

const Course = ({course}) =>  {
  return (
  <div>
  <Header course = {course}/>
  <Content parts = {course.parts}/>
  <Total number = {course.parts}/>
  </div>
  )
}

const Header = ({course}) => {
  return <h1>{course.name}</h1>
}

const Content = ({parts}) => {
  return(
  <div>
  {parts.map(part => <Part key={part.id} part = {part}/>)}
  </div>
  )
}

const Part = ({part}) => {
  return <p> {part.name} {part.exercises} </p>
}

const Total = ({number}) => {
  //black magic
  const total = number.reduce((accumulator,currentValue) =>
    accumulator + currentValue.exercises, 0)
  return ( 
  <b> total of exercises {total} </b>
  )
}

export default Course