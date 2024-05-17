import { createSelector, createSlice } from '@reduxjs/toolkit'

export const initialState = {
  user: undefined,
}

export const userSlice = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    addUser: (state, { payload }) => {
      state.user = { ...payload }
    },
    removeUser: (state) => {
      state.user = undefined
    },
  },
})
export default userSlice.reducer

export const { addUser, removeUser } = userSlice.actions

export const userReducerSelector = (state) => {
  return state[userSlice.name]
}

export const userSelector = createSelector(userReducerSelector, ({ user }) => ({
  user,
}))

