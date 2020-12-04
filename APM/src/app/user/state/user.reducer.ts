import { createAction, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { User } from '../user';

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
  on(createAction('[User] Toggle Mask User Name'), (state) => {

    return {
      ...state,
      maskUserName: !state.maskUserName,
    };
  })
);
