const Notification = ({ message, isError }) => {
    if (message === null) {
      return null
    }

    const errorStyle = {
        padding: '5px',
        fontSize: '20px',
        textAlign: 'center',
        color: 'red',
        backgroundColor: 'lightgrey',
        border: '3px solid red'
    }

    const infoStyle = {
        padding: '5px',
        fontSize: '20px',
        textAlign: 'center',
        color: 'green',
        backgroundColor: 'lightgrey',
        border: '3px solid green'
    }

    const style = isError ? errorStyle : infoStyle
  
    return (
      <div style={style}>
        {message}
      </div>
    )
}

export default Notification