import { put, takeLatest } from "redux-saga/effects";

import { ITokenEntity } from "@adapters/entity";
import { presenter } from "@adapters/presenters";
import { notifyMessageError } from "@emiter/AppEmitter";
import { doLoginSuccess } from "@store/actions";
import { getTokenInfoRequest, getTokenInfoSuccess, getTokenInfoFailure } from "@store/actions/token-action";
import config from "../../config";

function* getTokenInfoSaga(): Generator | any {
  try {
    yield put(getTokenInfoRequest(config.DEFAULT_TOKEN_ID));
    const resData: ITokenEntity = yield presenter.tokenInfo.getTokenInfo(config.DEFAULT_TOKEN_ID);
    yield put(getTokenInfoSuccess(resData));
  } catch (error) {
    yield put(getTokenInfoFailure("Fetch Token Info Fail!"));
    notifyMessageError("Fetch Token Info Fail!");
  }
}

function* getTokenInfoSagaWatcher() {
  yield takeLatest(doLoginSuccess.type, getTokenInfoSaga);
}

export const tokenWatchers = [getTokenInfoSagaWatcher()];
