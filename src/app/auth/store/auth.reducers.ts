import { Action } from '@ngrx/store';

import *  as AuthActions from './auth.actions'


export interface State {
    token: string,
    authenticated: boolean
}


const initialState: State = {
    token: null,
    authenticated: false
}

export function authReducer(state = initialState, actions:AuthActions.AuthActions){
    switch(actions.type) {
        case (AuthActions.SIGNUP):
        case (AuthActions.SIGNIN):
            return {
                ...state,
                authenticated: true
            }
        case (AuthActions.LOGOUT):
            return {
                ...state,
                token: null,
                authenticated: false
            }
        case (AuthActions.SET_TOKEN):
        return {
            ...state,
            token: actions.payload
        }
        default: 
            return state
    }
}