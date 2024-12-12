import { ActionType } from "../action-types";

import {Action} from "../actions";


const initialState = {
    amount : 0
};

const reducer = (state = initialState,action : Action) => {
  switch (action.type) {
    case ActionType.APPROVE_NFT:
    const nftId = action.payload;
      return {
        ...state,
        [nftId]: true,
      };
    case ActionType.APPROVE_TOKEN:
        const newAmount = action.payload;
      return {
        ...state,
        amount: newAmount,
      };
    default:
      return state;
  }
};

export default reducer