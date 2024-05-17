import { configureStore } from '@reduxjs/toolkit'
import { sagaMiddleware } from './sagaMiddleware'
import rootReducer from './reducer'

const middlewares = [sagaMiddleware]

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      thunk: true,
      immutableCheck: false,
      serializableCheck: false,
    }),
    ...middlewares,
  ],
  devTools: true,
})

export const purgeState = () => {
  store.purge()
}

