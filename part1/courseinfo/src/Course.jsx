const Header = (props) => {
    return (
        <h2>{props.course.name}</h2>
    )
}

const Part = (props) => {
    return (
        <li>
            {props.name} {props.exercise}
        </li>
    )
}

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map((part) =>
                <Part key={part.id} name={part.name} exercise={part.exercises} />
            )}
        </div>

    )
}

const Total = ({ parts }) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
        <p> <b>total of {total} exercises</b> </p>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course