import { createSelector, createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'

export const initialState = {
  devices: [],
}

export const userDevicesSlice = createSlice({
  name: 'userDevicesReducer',
  initialState,
  reducers: {
    addUserDevice: (state, { payload }) => {
      const newDevice = { ...payload }
      state.devices.push(newDevice)
    },
    addUserDevices: (state, { payload }) => {
      state.devices = []
      _.map(payload, device => {
        state.devices.push(device)
      })
    },
    deleteUserDevice: (state, { payload }) => {
      const { deviceId } = { ...payload }
      state.devices = _.reject(state.devices, { deviceId })
    },
    updateUserDevice: (state, { payload }) => {
      const { deviceId } = { ...payload }
      let device = _.find(state.devices, { deviceId })
      if(device) {
        state.devices = _.reject(state.devices, { deviceId })
        const newDevice = { ...payload }
        state.devices.push(newDevice)
      }
    },

  },
})
export default userDevicesSlice.reducer

export const { addUserDevice, addUserDevices, deleteUserDevice, updateUserDevice } = userDevicesSlice.actions

export const userDevicesReducerSelector = (state) => state[userDevicesSlice.name]

export const userDevicesSelector = createSelector(userDevicesReducerSelector, ({ devices }) => ({
  devices,
}))

