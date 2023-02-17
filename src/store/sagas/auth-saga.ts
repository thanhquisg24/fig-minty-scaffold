import { delay, put, race, select, spawn, take, takeEvery, takeLatest } from "redux-saga/effects";
import {
  doLoginFailure,
  doLoginRequest,
  doLoginSuccess,
  doLogoutFailure,
  doLogoutRequest,
  doLogoutSuccess,
  doRefreshTokenFailure,
  doRefreshTokenSuccess,
  fireClearToken,
  fireExpiredToken,
} from "@store/actions/auth-action";

import { IAuthModel } from "@store/models/auth-model";
import { IJwtEntity } from "@adapters/entity";
import { JWT_TOKEN_EXPIREIN } from "@adapters/infrastructures/adapters.infrastructures.config";
import { appInitAction } from "@store/actions";
import { getAuthSelector } from "@store/selector";
import { notifyMessageError } from "@emiter/AppEmitter";
import { presenter } from "@adapters/presenters";

interface ITokenObject {
  expiresIn: number;
  tokenCreatedAt: number;
  [otherProps: string]: any;
}

function isTokenExpired(token: ITokenObject): boolean {
  const currentTimestamp = Date.now();
  const { tokenCreatedAt: createdAt, expiresIn } = token;
  return currentTimestamp >= createdAt + expiresIn;
}

export function* timer(ms: number) {
  const { timeout } = yield race({
    timeout: delay(ms),
    cancel: take("auth/TOKEN_CLEAR"),
  });

  if (timeout) {
    yield put(fireExpiredToken());
  }
}

function* loginSaga(action: ReturnType<typeof doLoginRequest>): Generator | any {
  try {
    // yield delay(1000);
    const resData: IJwtEntity = yield presenter.auth.postLogin(action.payload.email, action.payload.password);
    yield put(doLoginSuccess({ ...resData, email: action.payload.email }));
    yield spawn(timer, resData.expiresIn);
    // yield delay(1000 * 60 * 5); //interval refresh 25 minute
    // yield put(doRefreshTokenRequest(resData.refreshToken));
  } catch (error) {
    // throw new Error(error);
    yield put(doLoginFailure("Email or password is incorrect!"));
    notifyMessageError("Email or password is incorrect!");
  }
}

function* logoutSaga(): Generator | any {
  try {
    const auth: IAuthModel = yield select(getAuthSelector);
    const username = auth.currentUser || "";
    yield presenter.auth.postLogout(username);
    yield put(doLogoutSuccess());
    yield put(fireClearToken());
  } catch (error) {
    yield put(doLogoutFailure(error.message));
    notifyMessageError(error.message);
  }
}

function* refreshTokenSaga(): Generator | any {
  // yield call(api);
  try {
    // yield delay(1000 * 60 * 5); //interval refresh 15 minute
    const tokenObject: IAuthModel = yield select(getAuthSelector);
    if (tokenObject.jwt) {
      const refreshTokenData = yield presenter.auth.postRefreshToken(tokenObject.jwt.refresh_token);
      yield put(doRefreshTokenSuccess(refreshTokenData));
      yield spawn(timer, refreshTokenData.expiresIn);
    } else {
      notifyMessageError("Not found Refresh Token !");
    }
    // yield put(doRefreshTokenRequest(refreshData.refreshToken));
  } catch (error) {
    yield put(doRefreshTokenFailure(error.message));
    notifyMessageError("Refresh Token Fail!");
    yield spawn(timer, JWT_TOKEN_EXPIREIN);
  }
}

function* initAuthTokenSaga(): Generator | any {
  try {
    const jwt: IJwtEntity | null = yield presenter.auth.checkInitLocalStorageLogin();
    if (jwt !== null) {
      const isExpired = isTokenExpired(jwt);
      if (isExpired) {
        presenter.auth.cleanAuthData();
        notifyMessageError("Your Session has been expired!");
      } else {
        yield put(doLoginSuccess({ ...jwt, email: "" }));
        yield spawn(timer, jwt.expiresIn);
      }
    }
  } catch (error) {
    yield put(doLoginFailure(error.message));
    // notifyMessageError(error.message);
  }
}

function* initAuthTokenWatcher() {
  yield takeLatest(appInitAction.type, initAuthTokenSaga);
}

function* refreshTokenSagaWatcher() {
  yield takeEvery(fireExpiredToken.type, refreshTokenSaga);
}

function* loginSagaWatcher() {
  yield takeLatest(doLoginRequest.type, loginSaga);
}

function* logoutSagaWatcher() {
  yield takeLatest(doLogoutRequest.type, logoutSaga);
}

export const authWatchers = [
  loginSagaWatcher(),
  logoutSagaWatcher(),
  refreshTokenSagaWatcher(),
  initAuthTokenWatcher(),
];
