import produce from 'immer';
import { ExcelTypes } from "./types";

const INITIAL_STATE = {
    users: {},
}

export default function excel(state = INITIAL_STATE, action){
    return produce(state, newState => {
        switch (action.type) {
            case ExcelTypes.GET_EXCEL:
                newState.users = action.payload
                break;
            default:
                break;
        }
    }) 
}