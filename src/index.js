import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from 'App'

import { MaterialUIControllerProvider } from 'context'
import { Provider } from 'react-redux'
import { sagaMiddleware } from './store/sagaMiddleware'
import { store } from './store/store'
import userSaga from './store/user/saga/userSaga'
import userDeviceSaga from './store/device/saga/deviceSaga'
import deviceTemplatesSaga from './store/device/saga/deviceTemplatesSaga'

const container = document.getElementById('app')

sagaMiddleware.run(userSaga)
sagaMiddleware.run(userDeviceSaga)
sagaMiddleware.run(deviceTemplatesSaga)

const root = createRoot(container)
root.render(
  <BrowserRouter>
      <Provider store={store}>
          <MaterialUIControllerProvider>
            <App />
          </MaterialUIControllerProvider>
      </Provider>
  </BrowserRouter>,
)
