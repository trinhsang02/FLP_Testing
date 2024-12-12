import { Dispatch } from "redux"
import { ActionType } from "../action-types"
import "../../type"
import { NftData } from "../../type"

export const approveNft = (nftId : number) => {
    return (dispatch :Dispatch) => {
        dispatch({
            type: ActionType.APPROVE_NFT,
            payload: nftId
        })
    }
}

export const approveToken = (amount : number) => {
    return (dispatch :Dispatch) => {
        dispatch({
            type: ActionType.APPROVE_TOKEN,
            payload: amount
        })
    }
}

export const setListedNfts = (nfts : NftData[] )=>{
    return (dispatch :Dispatch) => {
        dispatch({
            type: ActionType.FETCH_LISTED_NFTS,
            payload: nfts
        })
    }
}
export const setUserNfts = (nfts : NftData[] )=>{
    return (dispatch :Dispatch) => {
        dispatch({
            type: ActionType.FETCH_USERS_NFTS,
            payload: nfts
        })
    }
}
export const changeBirdColor = (color : string) => {
    return (dispatch :Dispatch) => {
        dispatch({
            type: ActionType.CHANGE_BIRD_COLOR,
            payload: color
        })
    }
}

