import { createSelector, createSlice } from "@reduxjs/toolkit";


export const initialState = {
    Devices: []
};

export const deviceslice = createSlice({
    name: "deviceslice",
    initialState,
    reducers: {
        addUserDevice: (state, {payload}) => {
            const newDevice = { ...payload };  
            state.Devices.push(newDevice);
        },
        deleteUserDevice: (state,{payload}) => {
            const {devicename} = {...payload};
            state.Devices = state.Devices.filter(device => device.name !== devicename);
        },
        updateUserDevice: (state, {payload}) => {
            const { name, userData } = {...payload}; 
            const deviceIndex = state.Devices.findIndex(device => device.name === name); 
            if (deviceIndex !== -1) {
                state.Devices[deviceIndex] = { ...state.Devices[deviceIndex], ...userData };
            }
        }
        
    }
});

const usermain = (state) => state.userdevice;

export const userRowSlicedata = createSelector(
    usermain,
    data => data.Devices
)


export const { addUserDevice, deleteUserDevice, updateUserDevice } = deviceslice.actions;
export default deviceslice.reducer;
