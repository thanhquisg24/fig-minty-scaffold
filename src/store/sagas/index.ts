import { all } from "redux-saga/effects";
import { authWatchers } from "./auth-saga";
import { tokenWatchers } from "./token-saga";
import { userWatchers } from "./user-saga";

export function* rootSaga(): Generator {
  yield all([...authWatchers, ...tokenWatchers, ...userWatchers]);
}
