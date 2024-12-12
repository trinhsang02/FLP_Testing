import { ActionType } from "../action-types";
import { Action } from "../actions";


// Define the initial state
const initialState = {
    birdColor: "default",
};

// Define the reducer function
const changeBirdColorReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case ActionType.CHANGE_BIRD_COLOR:
            return {
                ...state,
                birdColor: action.payload,
            };
        default:
            return state;
    }
};

export default changeBirdColorReducer;