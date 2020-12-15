import { createAction, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { User } from '../user';

import * as UserActions from '../state/user.actions'

export interface UserState {
  maskUserName: boolean;
  currentUser: User;
}

const initialState: UserState  = {
  maskUserName: false,
  currentUser: null
}

//Selectors

//'user' - same as defined in the user.module
const getUserFeatureState = createFeatureSelector<UserState>('user');

export const getMaskUserName = createSelector(getUserFeatureState, state => state.maskUserName);
export const getCurrentUser = createSelector(getUserFeatureState, state => state.currentUser);

export const userReducer = createReducer(
  initialState,
  on(UserActions.maskUserName, (state) => {

    return {
      ...state,
      maskUserName: !state.maskUserName,
    };
  })
);
