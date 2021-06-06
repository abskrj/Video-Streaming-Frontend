import actionTypes from "./actionTypes";

const INITIAL_STATE = {
    isSidebar: false,
    user: {},
    videos: []
}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.TOGGLE_SIDEBAR:
            return {
                ...state,
                isSidebar: !state.isSidebar
            }
    
        default:
            return state;
    }
}

export default reducer;