import { CombineAppActionTypes } from "./app-action";
import { CombineAuthActionTypes } from "./auth-action";
import { CombineTokenActionTypes } from "./token-action";
import { CombineUserActionTypes } from "./user-action";

export type CombineActionTypes =
  | CombineAuthActionTypes
  | CombineAppActionTypes
  | CombineTokenActionTypes
  | CombineUserActionTypes;
export * from "./app-action";
export * from "./user-action";
export * from "./auth-action";
export * from "./token-action";
