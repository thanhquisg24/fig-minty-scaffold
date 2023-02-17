import { RootStateType } from "../types";
import { IUserModel } from "@store/models/user-model";
import { IUserEntity } from "@adapters/entity";

export const getUserSelector = (state: RootStateType): IUserModel => state.user;
export const getUserInfoSelector = (state: RootStateType): IUserEntity | null => state.user.userData;
export const getUserIdSelector = (state: RootStateType): number | null =>
  state.user.userData ? state.user.userData.id : null;
