const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
    console.log(action)
    let newState
    switch (action.type) {
        case 'GOOD':
            newState = {
                good: state.good + 1,
                ok: state.ok,
                bad: state.bad,
            }
            return newState
        case 'OK':
            newState = {
                good: state.good,
                ok: state.ok + 1,
                bad: state.bad,
            }
            return newState
        case 'BAD':
            newState = {
                good: state.good,
                ok: state.ok,
                bad: state.bad + 1,
            }
            return newState
        case 'ZERO':
            newState = structuredClone(initialState)
            return newState
        default:
            return structuredClone(state)
    }
  
}

export default counterReducer
