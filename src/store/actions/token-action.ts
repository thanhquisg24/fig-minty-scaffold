import { ITokenEntity } from "@adapters/entity";
import { createAction } from "@reduxjs/toolkit";

export type IGetTokenSuccessPayload = ITokenEntity;

export const getTokenInfoRequest = createAction<number>("token/INFO_REQUEST");
export const getTokenInfoSuccess = createAction<IGetTokenSuccessPayload>("token/INFO_SUCCESS");
export const getTokenInfoFailure = createAction<string>("token/INFO_FAILURE");

export type CombineTokenActionTypes = ReturnType<typeof getTokenInfoRequest> | ReturnType<typeof getTokenInfoSuccess> | ReturnType<typeof getTokenInfoFailure>;
