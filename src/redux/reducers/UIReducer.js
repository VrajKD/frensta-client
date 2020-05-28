import { SET_ERRORS, CLEAR_ERRORS, LOADING_UI, STOP_UI_LOAD } from '../types'

const INITIAL_STATE = {
    loading: false,
    errors: {}
}


export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_ERRORS: return {
            ...state,
            loading: false,
            errors: action.payload
        }
        case CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                errors: {}
            }
        case LOADING_UI: return {
            ...state,
            loading: true
        }
        case STOP_UI_LOAD:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}