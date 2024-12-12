import { ActionType } from "../action-types";

import { Action } from "../actions";
import { NftData } from "../../type";

const initialState = {
  listedNfts: [],
  userNfts: [],
};

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.FETCH_LISTED_NFTS:
      const listedNfts: NftData[] = action.payload;

      return {
        ...state,
        listedNfts :listedNfts
      };
    case ActionType.FETCH_USERS_NFTS:
      const userNfts = action.payload;
      return {
        ...state,
        userNfts: userNfts,
      };
    default:
      return state;
  }
};

export default reducer;
