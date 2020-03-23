import { delay, take, call, apply, put } from 'redux-saga/effects'
import fetch from 'isomorphic-fetch'

import {
  GET_CURRENT_USER_INFO,
  setCurrentUser,
} from './../actions'

export function* currentUserSaga() {
  // while(true) {
  //   yield delay(1000)
  //   console.log('User saga loop')
  // }
  const { id } = yield take(GET_CURRENT_USER_INFO)
  const response = yield call(fetch, `http://localhost:8081/user/${id}`)
  const data = yield apply(response, response.json)
  yield put(setCurrentUser(data))
}
