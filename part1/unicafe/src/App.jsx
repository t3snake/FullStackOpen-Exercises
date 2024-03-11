import { useState } from 'react'

const Header = ({name}) => {
  return (
    <h1>
      {name}
    </h1>
  )
}

const Button = ({onClick, name}) => {
  return (
    <button onClick={onClick}>
      {name}
    </button>
  )
}

const Stats = ({name, value}) => {
  return (
    <div>
      {name} {value}
    </div>
  )
}

const Statistics = ({good, bad, neutral}) => {
  if (good === 0 && bad === 0 && neutral === 0 ){
    return (
      <div>
        <Header name={"Statistics"} />
        No feedback given
      </div>
    )
  }

  const calcAvg = () => {
    return (good - bad) / (good + bad + neutral)
  }

  const calcPositive = () => {
    return ( (good * 100) / (good + bad + neutral))
  }

  return (
    <div>
      <Header name={"Statistics"} />
      <Stats name={"Good"} value={good} />
      <Stats name={"Neutral"} value={neutral} />
      <Stats name={"Bad"} value={bad} />
      <Stats name={"All"} value={good + bad + neutral} />
      <Stats name={"Average"} value={calcAvg()} />
      <Stats name={"Positive"} value={calcPositive()} />
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => {
    setGood(good + 1)
  }

  const incrementNeutral = () => {
    setNeutral(neutral + 1)
  }

  const incrementBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Header name={"Give Feedback"} />
      <Button onClick={incrementGood} name={"Good"} />
      <Button onClick={incrementNeutral} name={"Neutral"} />
      <Button onClick={incrementBad} name={"Bad"} />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App