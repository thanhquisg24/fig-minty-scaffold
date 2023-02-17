import { combineReducers } from "@reduxjs/toolkit";
import authReducer, { initialAuthState } from "./auth-reducer";

import spinnerReducer, { initialSpinnerState } from "./spinner-reducer";
import userReducer, { initialUserState } from "./user-reducer";
import tokenReducer, { initialTokenState } from "./token-reducer";

const rootReducer = combineReducers({
  spinner: spinnerReducer,
  auth: authReducer,
  user: userReducer,
  token: tokenReducer,
});

export default rootReducer;
export const initialState: ReturnType<typeof rootReducer> = {
  spinner: initialSpinnerState,
  auth: initialAuthState,
  user: initialUserState,
  token: initialTokenState,
};
