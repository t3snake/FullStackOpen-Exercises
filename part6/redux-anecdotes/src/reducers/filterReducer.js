
export const filterAction = (filterText) => {
    return {
        type: "Filter",
        payload: filterText,
    }
}

const filterReducer = (state = "", action) => {
    if (action.type === "Filter") {
        return action.payload
    }
    return state
}

export default filterReducer