import { ITokenEntity } from "@adapters/entity";
import { ITokenModel } from "@store/models/token-model";
import { RootStateType } from "../types";

export const getTokenSelector = (state: RootStateType): ITokenModel => state.token;

export const getTokenInfoSelector = (state: RootStateType): ITokenEntity | null => state.token.tokenInfoData;
export const getTokenSymbolSelector = (state: RootStateType): string =>
  state.token.tokenInfoData ? state.token.tokenInfoData.tokenSymbol : "";
