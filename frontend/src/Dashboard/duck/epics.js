import { put, takeEvery, all, call } from 'redux-saga/effects';
import {
  FETCH_DEPOSITS,
  FETCH_DEPOSIT,
  FETCH_ERRORS,
  getDeposits,
  getDeposit,
  getErrors,
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

export function* fetchDeposit() {
  try {
    const response = yield call(Api.fetchDeposit)
    yield put(getDeposit(response.data));
  } catch(e) {}
}

export function* watchDeposit() {
  yield takeEvery(FETCH_DEPOSIT, fetchDeposit);
}

export function* fetchErrors() {
  try {
    const response = yield call(Api.fetchErrors)
    yield put(getErrors(response.data));
  } catch(e) {}
}

export function* watchErrors() {
  yield takeEvery(FETCH_ERRORS, fetchErrors)
}

export function* rootSaga() {
  yield all([
    watchDeposits(),
    watchDeposit(),
    watchErrors()
  ])
}
