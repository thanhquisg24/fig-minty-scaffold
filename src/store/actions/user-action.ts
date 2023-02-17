import { IUserEntity } from "@adapters/entity";
import { createAction } from "@reduxjs/toolkit";

export type IInfoSuccessPayload = IUserEntity;

export const getInfoRequest = createAction<number>("user/INFO_REQUEST");
export const getInfoSuccess = createAction<IInfoSuccessPayload>("user/INFO_SUCCESS");
export const getInfoFailure = createAction<string>("user/INFO_FAILURE");

export type CombineUserActionTypes = ReturnType<typeof getInfoRequest> | ReturnType<typeof getInfoSuccess> | ReturnType<typeof getInfoFailure>;
