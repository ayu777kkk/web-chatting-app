const initialState = {
    userDetails: null
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'DUMMY':
            return {
                userDetails: action.payload
            }
        default:
            return state
    }
}


export default reducer;