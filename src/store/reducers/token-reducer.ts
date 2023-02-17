import { createReducer } from "@reduxjs/toolkit";
import { getTokenInfoSuccess } from "@store/actions/token-action";
import { ITokenModel } from "@store/models/token-model";

export const initialTokenState: ITokenModel = {
  tokenInfoData: null,
  isLoading: false,
};

const tokenReducer = createReducer(initialTokenState as ITokenModel, (builder) => {
  builder.addCase(getTokenInfoSuccess, (state, action) => {
    return { ...state, tokenInfoData: action.payload, isLoading: false };
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

export default tokenReducer;
