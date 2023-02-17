import { IUserEntity } from "@adapters/entity";

export interface IUserModel {
  userData: null | IUserEntity;
  isLoading: boolean;
}
