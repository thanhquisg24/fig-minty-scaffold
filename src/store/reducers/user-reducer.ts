import { createReducer } from "@reduxjs/toolkit";
import { getInfoSuccess } from "@store/actions/user-action";
import { IUserModel } from "@store/models/user-model";

export const initialUserState: IUserModel = {
  userData: null,
  isLoading: false,
};

const userReducer = createReducer(initialUserState as IUserModel, (builder) => {
  builder.addCase(getInfoSuccess, (state, action) => {
    return { ...state, userData: action.payload, isLoading: false };
  });
  builder.addMatcher(
    (action) => action.type.endsWith("_REQUEST"),
    (state) => ({ ...state, isLoading: true }),
  );
  builder.addMatcher(
    (action) => action.type.endsWith("_FAILURE"),
    (state) => ({ ...state, isLoading: false }),
  );
});

export default userReducer;
