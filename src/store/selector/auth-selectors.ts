import { IJwtEntity } from "@adapters/entity";
import { IAuthModel } from "@store/models/auth-model";
import { RootStateType } from "../types";

export const getAuthSelector = (state: RootStateType): IAuthModel => state.auth;

export const getAuthJwtSelector = (state: RootStateType): IJwtEntity | null => state.auth.jwt;
