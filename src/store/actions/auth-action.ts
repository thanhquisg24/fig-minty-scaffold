import { IJwtEntity } from "@adapters/entity";
import { createAction } from "@reduxjs/toolkit";

export interface ILoginPayload {
  email: string;
  password: string;
}
export interface ICheckAuthPayload {
  token: string;
}
export interface ILoginSuccessPayload extends IJwtEntity {
  email: string;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IRefreshTokenSuccessPayload extends IJwtEntity {}
export const doLoginSpinner = "auth/LOGIN";
export const doLoginRequest = createAction<ILoginPayload>("auth/LOGIN_REQUEST");
export const doLoginSuccess = createAction<ILoginSuccessPayload>("auth/LOGIN_SUCCESS");
export const doLoginFailure = createAction<string>("auth/LOGIN_FAILURE");

export const doLogoutSpinner = "auth/LOGOUT";
export const doLogoutRequest = createAction<undefined>("auth/LOGOUT_REQUEST");
export const doLogoutSuccess = createAction<undefined>("auth/LOGOUT_SUCCESS");
export const doLogoutFailure = createAction<string>("auth/LOGOUT_FAILURE");

export const doRefreshTokenSpinner = "auth/REFRESH_TOKEN";
export const doRefreshTokenRequest = createAction<string>("auth/REFRESH_TOKEN_REQUEST");
export const doRefreshTokenSuccess = createAction<IRefreshTokenSuccessPayload>("auth/REFRESH_TOKEN_SUCCESS");
export const doRefreshTokenFailure = createAction<string>("auth/REFRESH_TOKEN_FAILURE");

export const checkAuthSpinner = "auth/CHECK_AUTH";
export const checkAuthRequest = createAction<ICheckAuthPayload>("auth/CHECK_AUTH_REQUEST");
export const checkAuthSuccess = createAction<undefined>("auth/CHECK_AUTH_SUCCESS");
export const checkAuthFailure = createAction<string>("auth/CHECK_AUTH_FAILURE");
export const fireExpiredToken = createAction<undefined>("auth/TOKEN_EXPIRED");
export const fireClearToken = createAction<undefined>("auth/TOKEN_CLEAR");

export type CombineAuthActionTypes =
  | ReturnType<typeof doRefreshTokenRequest>
  | ReturnType<typeof doRefreshTokenSuccess>
  | ReturnType<typeof doRefreshTokenFailure>
  | ReturnType<typeof doLogoutRequest>
  | ReturnType<typeof doLogoutSuccess>
  | ReturnType<typeof doLogoutFailure>
  | ReturnType<typeof doLoginRequest>
  | ReturnType<typeof doLoginSuccess>
  | ReturnType<typeof doLoginFailure>
  | ReturnType<typeof checkAuthRequest>
  | ReturnType<typeof checkAuthSuccess>
  | ReturnType<typeof checkAuthFailure>
  | ReturnType<typeof fireExpiredToken>
  | ReturnType<typeof fireClearToken>;
