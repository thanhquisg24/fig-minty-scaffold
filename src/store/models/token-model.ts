import { ITokenEntity } from "@adapters/entity";

export interface ITokenModel {
  tokenInfoData: null | ITokenEntity;
  isLoading: boolean;
}
