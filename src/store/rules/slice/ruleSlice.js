import { createSelector, createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'

export const initialState = {
  rules: [],
}

export const userRulesSlice = createSlice({
  name: 'userRulesReducer',
  initialState,
  reducers: {
    addUserRule: (state, { payload }) => {
      const newRule = { ...payload }
      state.rules.push(newRule)
    },
    addUserRules: (state, { payload }) => {
      state.rules = []
      _.map(payload, rule => {
        state.rules.push(rule)
      })
    },
    deleteUserRule: (state, { payload }) => {
      const { ruleId } = { ...payload }
      state.rules = _.reject(state.rules, { ruleId })
    },
    updateUserRule: (state, { payload }) => {
      const { ruleId } = { ...payload }
      let rule = _.find(state.rules, { ruleId })
      if(rule) {
        state.rules = _.reject(state.rules, { ruleId })
        const newRule = { ...payload }
        state.rules.push(newRule)
      }
    },

  },
})
export default userRulesSlice.reducer

export const { addUserRule, addUserRules, deleteUserRule, updateUserRule } = userRulesSlice.actions

export const userRulesReducerSelector = (state) => state[userRulesSlice.name]

export const userRulesSelector = createSelector(userRulesReducerSelector, ({ rules }) => ({
  rules,
}))

