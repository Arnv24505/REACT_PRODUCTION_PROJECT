import { createSelector, createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'

export const initialState = {
  deviceTemplates: [],
}

export const deviceTemplatesSlice = createSlice({
  name: 'deviceTemplatesReducer',
  initialState,
  reducers: {
    addTemplate: (state, { payload: { templateId, deviceConfig } }) => {
      const newTemplate = { templateId, ...deviceConfig }
      state.deviceTemplates.push(newTemplate)
    },
    addTemplates: (state, { payload }) => {
      state.deviceTemplates = []
      _.map(payload, ({ templateId, deviceConfig }) => {
        const newTemplate = { templateId, ...deviceConfig }
        state.deviceTemplates.push(newTemplate)
      })
    },
    deleteTemplate: (state, { payload }) => {
      const { templateId } = { ...payload }
      state.deviceTemplates = _.reject(state.deviceTemplates, { templateId })
    },
    updateTemplate: (state, { payload }) => {
      const { templateId, deviceConfig } = { ...payload }
      let template = _.find(state.deviceTemplates, { templateId })
      if(template) {
        state.deviceTemplates = _.reject(state.deviceTemplates, { templateId })
        const newTemplate = { templateId, ...deviceConfig }
        state.deviceTemplates.push(newTemplate)
      }
    },

  },
})
export default deviceTemplatesSlice.reducer

export const { addTemplate, addTemplates, deleteTemplate, updateTemplate } = deviceTemplatesSlice.actions

export const deviceTemplatesReducerSelector = (state) => state[deviceTemplatesSlice.name]

export const deviceTemplatesSelector = createSelector(deviceTemplatesReducerSelector, ({ deviceTemplates }) => ({
  deviceTemplates,
}))

