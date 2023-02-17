import { createAction } from "@reduxjs/toolkit";

export const appInitAction = createAction<undefined>("figApp/INITIAL");
export type CombineAppActionTypes = ReturnType<typeof appInitAction>;
