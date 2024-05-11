import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../DeviceReucers/DeviceReducers";
import createSagaMiddleware from 'redux-saga'
import mainFuntionSaga from "../DeviceSaga/DeviceSaga";
import { deviceslice } from "../DeviceSlice/DeviceSlice";
const sagamiddleWare = createSagaMiddleware()

export const deviceStore = configureStore({
    reducer : {
        userdevice : deviceslice.reducer
    },
    middleware :(getDefaultMiddleware) => getDefaultMiddleware().concat(sagamiddleWare)
});

sagamiddleWare.run(mainFuntionSaga)

