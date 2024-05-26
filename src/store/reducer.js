import { combineReducers } from 'redux'
import { PURGE } from 'redux-persist'
import userDevicesReducer from 'store/device/slice/deviceSlice'
import userRulesReducer from 'store/rules/slice/ruleSlice'
import userReducer from 'store/user/slice/userSlice'
import deviceTemplatesReducer from 'store/device/slice/deviceTemplatesSlice'

const entitiesReducer = combineReducers({
  userDevicesReducer,
  userReducer,
  deviceTemplatesReducer,
  userRulesReducer,
})

const rootReducer = (state, action) => {
  if(action.type === PURGE) {
    state = undefined
  }

  return entitiesReducer(state, action)
}

export default rootReducer
