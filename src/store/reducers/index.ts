import spinnerReducer, { initialSpinnerState } from "./spinner-reducer";

import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  spinner: spinnerReducer,
});

export default rootReducer;
export const initialState: ReturnType<typeof rootReducer> = {
  spinner: initialSpinnerState,
};
