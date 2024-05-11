import { combineReducers } from 'redux';
import { setName, setDeviceType, setLocation, setDeviceStatus, setConnectionInfo, setMQTT, setHTTPS, setDeviceInfoName, setDeviceInfoUnit, setDeviceInfoMax, setDeviceInfoMin, setDeviceInfoTMax, setDeviceInfoTMin, addUserDevice, deleteUserDevice, updateUserDevice } from '../DeviceSlice/DeviceSlice';

const deviceReducer = combineReducers({
    addUserDevice,
    deleteUserDevice,
    updateUserDevice
});

const rootReducer = combineReducers({
    device: deviceReducer
})

export default rootReducer;
