import { createAction } from '@reduxjs/toolkit'
import { call, put, takeEvery } from 'redux-saga/effects'
import axios from 'axios'
import { addTemplate, addTemplates, deleteTemplate, updateTemplate } from '../slice/deviceTemplatesSlice'

export const getDeviceTemplates = createAction(`getDeviceTemplatesSaga`)

function * getDeviceTemplatesSaga ({ payload }) {
  try {
    const result = yield call(axios.post, '/wapi/template/getTemplates',
      { deviceId: payload && payload.templateId ? payload.templateId : undefined }, {
        withCredentials: true,
      })
    const data = result.data
    yield put(addTemplates(data))
  } catch (error) {
    console.error('network failure', error)
  }
}

export const addDeviceTemplate = createAction(`addDeviceTemplateSaga`)

function * addDeviceTemplateSaga ({ payload: { templateObject, onSuccess } }) {
  try {
    const result = yield call(axios.post, '/wapi/template/addData', templateObject, {
      withCredentials: true,
    })
    const { template } = result.data
    if(template) {
      yield put(addTemplate(template))
      onSuccess(true)
    } else {
      onSuccess(false)
    }
  } catch (error) {
    console.error('network failure', error)
  }
}

export const deleteDeviceTemplate = createAction(`deleteDeviceTemplateSaga`)

function * deleteDeviceTemplateSaga ({ payload: { templateObject, onSuccess } }) {
  try {
    const response = yield call(axios.post, '/wapi/template/delData', templateObject, {
      withCredentials: true,
    })
    const { result } = response.data
    if(result === 'Success') {
      yield put(deleteTemplate(templateObject))
      onSuccess(true)
    } else {
      onSuccess(false)
    }
  } catch (error) {
    console.error('network failure', error)
  }
}

export const updateDeviceTemplate = createAction(`updateDeviceTemplateSaga`)

function * updateDeviceTemplateSaga ({ payload: { templateObject, onSuccess } }) {
  try {
    const result = yield call(axios.post, '/wapi/template/editData', templateObject, {
      withCredentials: true,
    })
    const { template } = result.data
    if(template) {
      yield put(updateTemplate(template))
      onSuccess(true)
    } else {
      onSuccess(false)
    }
  } catch (error) {
    console.error('network failure', error)
  }
}

export default function * deviceTemplatesSaga () {
  yield takeEvery(getDeviceTemplates.type, getDeviceTemplatesSaga)
  yield takeEvery(addDeviceTemplate.type, addDeviceTemplateSaga)
  yield takeEvery(deleteDeviceTemplate.type, deleteDeviceTemplateSaga)
  yield takeEvery(updateDeviceTemplate.type, updateDeviceTemplateSaga)
}