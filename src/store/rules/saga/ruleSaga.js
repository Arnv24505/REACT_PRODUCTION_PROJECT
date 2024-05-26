import { createAction } from '@reduxjs/toolkit'
// import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import { call, put, takeEvery } from 'redux-saga/effects'
import axios from 'axios'
import { addUserRule, addUserRules, deleteUserRule, updateUserRule } from '../slice/ruleSlice'

export const getRules = createAction(`getRulesSaga`)

function * getRulesSaga ({ payload }) {
  try {
    const result = yield call(axios.post, '/wapi/rule/getDataSnapshot',
      { ruleId: payload && payload.ruleId ? payload.ruleId : undefined }, {
        withCredentials: true,
      })
    const rules = result.data
    yield put(addUserRules(rules))
  } catch (error) {
    console.error('network failure', error)
  }
}

export const addRule = createAction(`addRuleSaga`)

function * addRuleSaga ({ payload: { ruleObject, onSuccess } }) {
  try {
    const result = yield call(axios.post, '/wapi/rule/addData', ruleObject, {
      withCredentials: true,
    })
    const { details } = result.data
    if(details.includes('success')) {
      yield put(getRules())
      onSuccess(true)
    } else {
      onSuccess(false)
    }
  } catch (error) {
    console.error('network failure', error)
  }
}

export const deleteRule = createAction(`deleteRuleSaga`)

function * deleteRuleSaga ({ payload: { ruleObject, onSuccess } }) {
  try {
    const response = yield call(axios.post, '/wapi/rule/delData', ruleObject, {
      withCredentials: true,
    })
    const { details } = response.data
    if(details.includes('success')) {
      yield put(getRules())
      onSuccess(true)
    } else {
      onSuccess(false)
    }
  } catch (error) {
    console.error('network failure', error)
  }
}

export const updateRule = createAction(`updateRuleSaga`)

function * updateRuleSaga ({ payload: { ruleObject, onSuccess } }) {
  try {
    const result = yield call(axios.post, '/wapi/rule/editData', ruleObject, {
      withCredentials: true,
    })
    const { details } = result.data
    if(details.includes('success')) {
      yield put(getRules())
      onSuccess(true)
    } else {
      onSuccess(false)
    }
  } catch (error) {
    console.error('network failure', error)
  }
}

export default function * userRulesSaga () {
  yield takeEvery(getRules.type, getRulesSaga)
  yield takeEvery(addRule.type, addRuleSaga)
  yield takeEvery(deleteRule.type, deleteRuleSaga)
  yield takeEvery(updateRule.type, updateRuleSaga)
}