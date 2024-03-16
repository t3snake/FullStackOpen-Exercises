const Header = (props) => {
  return (
    <h1>{props.course.name}</h1>
  )
}

const Part = (props) => {
  console.log(props)
  return(
    <li>
      {props.name} {props.exercise}
    </li>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.map( (part) => 
          <Part key={part.id} name={part.name} exercise={part.exercises} />    
       )}
    </div>
    
  )
}

const Total = ({parts}) => {
  const total = parts.reduce( (sum, part) => sum + part.exercises, 0)
  return (
    <p> <b>total of {total} exercises</b> </p>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App
