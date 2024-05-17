import { createAction } from '@reduxjs/toolkit'
import { call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'
import { addUser, removeUser } from '../slice/userSlice'

export const loginUser = createAction('loginUserSaga')

export function * loginUserSaga ({ payload: { username, password } }) {
  try {
    const result = yield call(axios.post, '/wapi/login', { username, password }, {
      withCredentials: true,
    })
    const { success } = result.data
    if(success) {
      const { userInfo } = result.data
      const { _id: userId, name: displayName, role } = userInfo
      yield put(addUser({ userId, displayName, role }))
    }

  } catch (error) {
    console.error('network failure', error)
  }
}

export const registerUser = createAction('registerUserSaga')

export function * registerUserSaga ({ payload: { name, email, password, navigate } }) {
  try {
    const result = yield call(axios.post, '/wapi/register', { role: 'Admin', name, email, username: email, password }, {
      withCredentials: true,
    })
    const { success } = result.data
    if(success) {
      navigate('/login')
    } else {
      navigate('/signup')
    }
  } catch (error) {
    console.error('network failure', error)
  }
}

export const getUser = createAction('getUserSaga')

export function * getUserSaga ({ payload }) {
  try {
    const result = yield call(axios.get, '/wapi/get-session', {
      withCredentials: true,
    })
    const { success } = result.data
    if(success) {
      const { userInfo } = result.data
      const { _id: userId, name: displayName, role } = userInfo
      yield put(addUser({ userId, displayName, role }))
    } else {
      if(payload && payload.navigate) payload.navigate('/login')
    }
  } catch (error) {
    console.error('network failure', error)
  }
}

export const logoutUser = createAction('logoutUserSaga')

export function * logoutUserSaga ({ payload: { navigate } }) {
  try {
    yield call(axios.post, '/wapi/logout', {}, {
      withCredentials: true,
    })
    yield put(removeUser())
    navigate('/login')

  } catch (error) {
    console.error('network failure', error)
  }
}

export default function * userSaga () {
  yield takeLatest(loginUser.type, loginUserSaga)
  yield takeLatest(getUser.type, getUserSaga)
  yield takeLatest(logoutUser.type, logoutUserSaga)
  yield takeLatest(registerUser.type, registerUserSaga)

}