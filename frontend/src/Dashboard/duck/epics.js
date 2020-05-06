import { put, takeEvery, all, call } from 'redux-saga/effects';
import {
  FETCH_DEPOSITS,
  FETCH_BALANCE,
  getDeposits,
  getBalance,
} from './duck';
import * as Api from './api';

export function* fetchDeposits() {
  try {
    const response = yield call(Api.fetchDeposits)
    yield put(getDeposits(response.data));
  } catch(e) {}
}

export function* watchDeposits() {
  yield takeEvery(FETCH_DEPOSITS, fetchDeposits);
}

export function* fetchBalance() {
  try {
    const response = yield call(Api.fetchBalance);
    yield put(getBalance(response.data));
  } catch(e) {}
}

export function* watchBalance() {
  yield takeEvery(FETCH_BALANCE, fetchBalance)
}

export function* rootSaga() {
  yield all([
    watchDeposits(),
    watchBalance()
  ])
}
