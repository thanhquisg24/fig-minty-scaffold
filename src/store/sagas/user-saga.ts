import { put, takeLatest } from "redux-saga/effects";

import { IUserEntity } from "@adapters/entity";

import { presenter } from "@adapters/presenters";
import { notifyMessageError } from "@emiter/AppEmitter";
import { doLoginSuccess } from "@store/actions";
import { getInfoFailure, getInfoSuccess, getInfoRequest } from "@store/actions/user-action";

function* getUserLoginSaga(action: ReturnType<typeof doLoginSuccess>): Generator | any {
  try {
    const { userId } = action.payload;
    yield put(getInfoRequest(userId));
    // const resData: IUserEntity = yield presenter.user.getUserInfo(userId);
    // yield put(getInfoSuccess(resData));
  } catch (error) {
    yield put(getInfoFailure("Fetch User Info Fail!"));
    notifyMessageError("Fetch User Info Fail!");
  }
}

function* getUserLoginSagaWatcher() {
  yield takeLatest(doLoginSuccess.type, getUserLoginSaga);
}

function* getUserRequestSaga(action: ReturnType<typeof getInfoRequest>): Generator | any {
  try {
    const userId = action.payload;
    const resData: IUserEntity = yield presenter.user.getUserInfo(userId);
    yield put(getInfoSuccess(resData));
  } catch (error) {
    yield put(getInfoFailure("Fetch User Info Fail!"));
    notifyMessageError("Fetch User Info Fail!");
  }
}

function* getUserRequestSagaWatcher() {
  yield takeLatest(getInfoRequest.type, getUserRequestSaga);
}

export const userWatchers = [getUserLoginSagaWatcher(), getUserRequestSagaWatcher()];
