import { UserState } from '../user/state/user.reducer';

//Note no feature module state defined here as they arte lazy loaded (eg ProductState)
export interface State {

  //Non lazy loaded - app level
  user: UserState;
}