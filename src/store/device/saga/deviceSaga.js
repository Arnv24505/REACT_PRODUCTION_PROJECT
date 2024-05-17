import { createAction } from '@reduxjs/toolkit'
// import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import { call, put, takeEvery } from 'redux-saga/effects'
import { addUserDevice, addUserDevices, deleteUserDevice, updateUserDevice } from '../slice/deviceSlice'
import axios from 'axios'

export const getDevices = createAction(`getDevicesSaga`)

function * getDevicesSaga ({ payload }) {
  try {
    const result = yield call(axios.post, '/wapi/device/getDevices',
      { deviceId: payload && payload.deviceId ? payload.deviceId : undefined }, {
        withCredentials: true,
      })
    const devices = result.data
    yield put(addUserDevices(devices))
    console.log('get devices is', data)
  } catch (error) {
    console.error('network failure', error)
  }
}

export const addDevice = createAction(`addDeviceSaga`)

function * addDeviceSaga ({ payload: { deviceObject, onSuccess } }) {
  try {
    console.log('recvd obj', deviceObject)
    const result = yield call(axios.post, '/wapi/device/addData', deviceObject, {
      withCredentials: true,
    })
    const { device } = result.data
    if(device) {
      yield put(addUserDevice(device))
      onSuccess(true)
    } else {
      onSuccess(false)
    }
  } catch (error) {
    console.error('network failure', error)
  }
}

export const deleteDevice = createAction(`deleteDeviceSaga`)

function * deleteDeviceSaga ({ payload: { deviceObject, onSuccess } }) {
  try {
    console.log('recvd obj', deviceObject)
    const response = yield call(axios.post, '/wapi/device/delData', deviceObject, {
      withCredentials: true,
    })
    const { result } = response.data
    if(result === 'Success') {
      yield put(deleteUserDevice(deviceObject))
      onSuccess(true)
    } else {
      onSuccess(false)
    }
  } catch (error) {
    console.error('network failure', error)
  }
}

export const updateDevice = createAction(`updatedDeviceSaga`)

function * updatedDeviceSaga ({ payload: { deviceObject, onSuccess } }) {
  try {
    console.log('recvd obj', deviceObject)
    const result = yield call(axios.post, '/wapi/device/editData', deviceObject, {
      withCredentials: true,
    })
    const { device } = result.data
    if(device) {
      yield put(updateUserDevice(device))
      onSuccess(true)
    } else {
      onSuccess(false)
    }
  } catch (error) {
    console.error('network failure', error)
  }
}

export default function * userDeviceSaga () {
  yield takeEvery(getDevices.type, getDevicesSaga)
  yield takeEvery(addDevice.type, addDeviceSaga)
  yield takeEvery(deleteDevice.type, deleteDeviceSaga)
  yield takeEvery(updateDevice.type, updatedDeviceSaga)
}