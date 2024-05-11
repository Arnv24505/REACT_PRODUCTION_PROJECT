import { createAction } from "@reduxjs/toolkit";
import { addUserDevice, deleteUserDevice, updateUserDevice } from "../DeviceSlice/DeviceSlice";
// import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import {put, takeEvery} from 'redux-saga/effects'
import { yellow } from "@mui/material/colors";

export const addDevice = createAction(`addDeviceSaga`)
function * addDeviceSaga(action){
    yield put(addUserDevice(action.payload))
}

export const deleteDevice = createAction(`deleteDeviceSaga`)

function * deleteDeviceSaga(action){
    yield put(deleteUserDevice(action.payload))
}
export const updateDevice = createAction(`updatedDeviceSaga`)

function * updatedDeviceSaga(action){
    yield put(updateUserDevice(action.payload))
}



export default function * mainFuntionSaga(){
    yield takeEvery(addDevice.type, addDeviceSaga);
    yield takeEvery(deleteDevice.type,deleteDeviceSaga)
    yield takeEvery(updateDevice.type,updatedDeviceSaga)
}