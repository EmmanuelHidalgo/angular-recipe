import {Effect, Actions} from '@ngrx/effects'
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import {fromPromise} from 'rxjs/observable/fromPromise';
import * as firebase from 'firebase';

import * as AuthActions from './auth.actions'
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects{

    @Effect()
    authSignup = this.actions$
        .ofType(AuthActions.TRY_SIGNUP)
        .map((action: AuthActions.TrySignup)=> {
            return action.payload
        })
        .switchMap((authData: {username:string,password:string})=> {
            return fromPromise(
                firebase.auth()
                .createUserWithEmailAndPassword(authData.username, authData.password)
            )
        })
        .switchMap(()=> {
           return fromPromise(firebase.auth().currentUser.getToken());
        })
        .mergeMap((token:string)=> {
            return [
                {
                    type: AuthActions.SIGNUP
                },
                {
                    type: AuthActions.SET_TOKEN,
                    payload: token
                }
            ]
        })
    
    @Effect()
    authSigin = this.actions$
        .ofType(AuthActions.TRY_SIGNIN)
        .map((action: AuthActions.TrySignin)=> {
            return action.payload
        })
        .switchMap((authData: {username:string, password:string})=> {
            return fromPromise(
                firebase.auth().signInWithEmailAndPassword(authData.username,authData.password)
            )
        })
        .switchMap(() => {
            return fromPromise(firebase.auth().currentUser.getToken());
        })
        .mergeMap((token:string)=> {
            this.router.navigate(['/'])
            return [
                {
                    type: AuthActions.SIGNIN
                },
                {
                    type: AuthActions.SET_TOKEN,
                    payload: token
                }
            ]
        })
    
        @Effect({dispatch: false})
        authLogout = this.actions$
        .ofType(AuthActions.LOGOUT)
        .do(() => {
            this.router.navigate(['/'])
        })
    
    constructor(private actions$ : Actions, private router: Router){

    }
}