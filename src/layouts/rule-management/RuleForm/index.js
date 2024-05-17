import React, { useEffect, useState } from 'react'
import { Box, Card, FormControl, Grid, Icon, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import MDButton from 'components/MDButton'
import MDBox from 'components/MDBox'
import RuleAction from '../table/ruleAction'
import MDInput from 'components/MDInput'

const RuleForm = ({
  deviceType,
  conditionOperators,
  values,
  setSubmitData,
  endpoints = [],
  operations = [],
  ruleTypes,
  defaultData,
  previewEnable,
  setPreviewEnable,
}) => {
  const [tempData, setTempData] = useState({
    name: defaultData.name || '',
    ruleType: defaultData.type || '',
    deviceType: '',
    value: '',
    conditionOperator: '',
    endpoint: '',
    operation: '',
    conditions: defaultData.description || '',
    actions: defaultData.actions || [],
  })
  const [formData, setFormData] = useState({
    name: '',
    ruleType: '',
    conditions: '',
    actions: [],
  })
  const [ruleConditions, setRuleConditions] = useState(defaultData.description || '')
  const [ruleTypeMenuOpen, setRuleTypeMenuOpen] = useState(false)
  const [deviceTypeMenuOpen, setDeviceTypeMenuOpen] = useState(false)
  const [conditionMenuOpen, setConditionMenuOpen] = useState(false)
  const [valueMenuOpen, setValueMenuOpen] = useState(false)
  const [endpointMenuOpen, setEndpointMenuOpen] = useState(false)
  const [operationMenuOpen, setOperationMenuOpen] = useState(false)
  const [actionData, setActionData] = useState(defaultData.actions || [])
  const [formEditable, setFormEditable] = useState(!previewEnable)

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      name: tempData.name,
      ruleType: tempData.ruleType,
      conditions: ruleConditions,
      actions: actionData,
    }))
  }, [ruleConditions, actionData, tempData])

  const handleSubmit = (event) => {
    if(!previewEnable) {
      defaultData = {}
      event.preventDefault()
      setSubmitData(formData)
      setTempData({})
    }
    setPreviewEnable(false)
    setFormEditable(false)
  }

  const handleSelectChange = (event) => {
    const { name, value } = event.target
    setTempData({
      ...tempData,
      [name]: value,
    })
  }

  const handleMenuOpen = (menu) => () => {
    if(menu === 'type') setDeviceTypeMenuOpen(true)
    else if(menu === 'ruleTypes') setRuleTypeMenuOpen(true)
    else if(menu === 'value') setValueMenuOpen(true)
    else if(menu === 'conditionOperator') setConditionMenuOpen(true)
    else if(menu === 'endpoint') setEndpointMenuOpen(true)
    else if(menu === 'operation') setOperationMenuOpen(true)
  }

  const handleMenuClose = (menu) => () => {
    if(menu === 'type') setDeviceTypeMenuOpen(false)
    else if(menu === 'ruleTypes') setRuleTypeMenuOpen(false)
    else if(menu === 'value') setValueMenuOpen(false)
    else if(menu === 'conditionOperator') setConditionMenuOpen(false)
    else if(menu === 'endpoint') setEndpointMenuOpen(false)
    else if(menu === 'operation') setOperationMenuOpen(false)
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setTempData({
      ...tempData,
      [name]: value,
    })
  }

  const handleAdd = () => {
    const addCondition = `${ruleConditions} ${tempData.deviceType} ${tempData.conditionOperator} ${tempData.value}`
    setRuleConditions(addCondition)
    setTempData({
      ...tempData,
      conditions: addCondition,
      deviceType: '',
      conditionOperator: '',
      value: '',
    })
  }

  const handleAnd = () => {
    const andCondition = `${ruleConditions} AND`
    setRuleConditions(andCondition)
    setTempData({
      ...tempData,
      conditions: andCondition,
    })
  }

  const handleOr = () => {
    const orCondition = `${ruleConditions} OR`
    setRuleConditions(orCondition)
    setTempData({
      ...tempData,
      conditions: orCondition,
    })
  }

  const handleActionAdd = () => {
    const newActionData = [
      ...actionData,
      {
        endpoint: tempData.endpoint,
        operation: tempData.operation,
        actionIcons: ['edit', 'delete'],
      },
    ]
    setActionData(newActionData)
    setTempData({
      ...tempData,
      endpoint: '',
      operation: '',
      actions: newActionData,
    })
  }

  return (
    <Box pt={6} pb={3} xs={12}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <Box p={3}>
                <Box mb={2}>
                  <MDInput
                    type='text'
                    name='name'
                    label='Rule Name'
                    variant='standard'
                    value={tempData.name}
                    setValueMenuOpen={tempData.name}
                    onChange={handleInputChange}
                    disabled={!formEditable}
                    fullWidth
                  />
                </Box>

                <Box mb={2}>
                  <FormControl variant='standard' sx={{ py: 1, minWidth: '100%' }}>
                    <InputLabel id='ruleTypes-select-label'>Rule Type</InputLabel>
                    <Select
                      labelId='ruleTypes-select-label'
                      name='ruleType'
                      value={tempData.ruleType}
                      onChange={handleSelectChange}
                      label='Rule Type'
                      open={ruleTypeMenuOpen}
                      onOpen={handleMenuOpen('ruleTypes')}
                      onClose={handleMenuClose('ruleTypes')}
                      IconComponent={() => (
                        <IconButton
                          size='large'
                          style={{ padding: 0, marginRight: '8px' }}
                          aria-label='open-menu'
                        >
                          <Icon>{ruleTypeMenuOpen ? 'arrow_drop_up' : 'arrow_drop_down'}</Icon>
                        </IconButton>
                      )}
                      disabled={!formEditable}
                    >
                      {ruleTypes.map((name) => (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                <MDBox>
                  {formEditable && (
                    <MDBox
                      justifyContent='space-between'
                      sx={{ display: 'flex', flexWrap: 'wrap' }}
                    >
                      <FormControl variant='standard' sx={{ py: 1, minWidth: '20%' }}>
                        <InputLabel id='deviceType-select-label'>Device Type</InputLabel>
                        <Select
                          labelId='deviceType-select-label'
                          name='deviceType'
                          value={tempData.deviceType}
                          onChange={handleSelectChange}
                          label='Device Type'
                          open={deviceTypeMenuOpen}
                          onOpen={handleMenuOpen('type')}
                          onClose={handleMenuClose('type')}
                          IconComponent={() => (
                            <IconButton
                              size='large'
                              style={{ padding: 0, marginRight: '8px' }}
                              aria-label='open-menu'
                            >
                              <Icon>
                                {deviceTypeMenuOpen ? 'arrow_drop_up' : 'arrow_drop_down'}
                              </Icon>
                            </IconButton>
                          )}
                        >
                          {deviceType.map((name) => (
                            <MenuItem key={name} value={name}>
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      <FormControl variant='standard' sx={{ py: 1, minWidth: '20%' }}>
                        <InputLabel id='conditionOperator-select-label'>
                          Condition Operator
                        </InputLabel>
                        <Select
                          labelId='conditionOperator-select-label'
                          name='conditionOperator'
                          value={tempData.conditionOperator}
                          onChange={handleSelectChange}
                          label='Condition Operator'
                          open={conditionMenuOpen}
                          onOpen={handleMenuOpen('conditionOperator')}
                          onClose={handleMenuClose('conditionOperator')}
                          IconComponent={() => (
                            <IconButton
                              size='large'
                              style={{ padding: 0, marginRight: '8px' }}
                              aria-label='open-menu'
                            >
                              <Icon>{conditionMenuOpen ? 'arrow_drop_up' : 'arrow_drop_down'}</Icon>
                            </IconButton>
                          )}
                        >
                          {conditionOperators.map((name) => (
                            <MenuItem key={name} value={name}>
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      <FormControl variant='standard' sx={{ py: 1, minWidth: '20%' }}>
                        <InputLabel id='value-select-label'>Value</InputLabel>
                        <Select
                          labelId='value-select-label'
                          name='value'
                          value={tempData.value}
                          onChange={handleSelectChange}
                          label='Value'
                          open={valueMenuOpen}
                          onOpen={handleMenuOpen('value')}
                          onClose={handleMenuClose('value')}
                          IconComponent={() => (
                            <IconButton
                              size='large'
                              style={{ padding: 0, marginRight: '8px' }}
                              aria-label='open-menu'
                            >
                              <Icon>{valueMenuOpen ? 'arrow_drop_up' : 'arrow_drop_down'}</Icon>
                            </IconButton>
                          )}
                        >
                          {values.map((name) => (
                            <MenuItem key={name} value={name}>
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      <MDBox
                        sx={{
                          py: 1,
                          justifyContent: 'space-between',
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '5px',
                        }}
                      >
                        <MDButton
                          color='success'
                          type='button'
                          sx={{ my: '10px' }}
                          onClick={handleAdd}
                          disabled={
                            !tempData.deviceType || !tempData.conditionOperator || !tempData.value
                          }
                        >
                          Add
                        </MDButton>

                        <MDButton
                          color='info'
                          type='button'
                          onClick={() => handleAnd()}
                          sx={{ my: '10px' }}
                          disabled={
                            !ruleConditions ||
                            ruleConditions.endsWith('AND') ||
                            ruleConditions.endsWith('OR')
                          }
                        >
                          And
                        </MDButton>

                        <MDButton
                          color='info'
                          type='button'
                          onClick={() => handleOr()}
                          sx={{ my: '10px' }}
                          disabled={
                            !ruleConditions ||
                            ruleConditions.endsWith('AND') ||
                            ruleConditions.endsWith('OR')
                          }
                        >
                          Or
                        </MDButton>
                      </MDBox>
                    </MDBox>
                  )}

                  {ruleConditions && (
                    <MDBox my={2}>
                      <TextField
                        label='Conditions'
                        multiline
                        rows={3}
                        fullWidth
                        variant='outlined'
                        value={ruleConditions}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </MDBox>
                  )}
                </MDBox>

                <MDBox>
                  {formEditable && (
                    <MDBox
                      justifyContent='space-between'
                      sx={{ display: 'flex', flexWrap: 'wrap' }}
                    >
                      <FormControl variant='standard' sx={{ py: 1, minWidth: '30%' }}>
                        <InputLabel id='endpoint-select-label'>Endpoint</InputLabel>
                        <Select
                          labelId='endpoint-select-label'
                          name='endpoint'
                          value={tempData.endpoint}
                          onChange={handleSelectChange}
                          label='Endpoint'
                          open={endpointMenuOpen}
                          onOpen={handleMenuOpen('endpoint')}
                          onClose={handleMenuClose('endpoint')}
                          IconComponent={() => (
                            <IconButton
                              size='large'
                              style={{ padding: 0, marginRight: '8px' }}
                              aria-label='open-menu'
                            >
                              <Icon>{endpointMenuOpen ? 'arrow_drop_up' : 'arrow_drop_down'}</Icon>
                            </IconButton>
                          )}
                        >
                          {endpoints.map((name) => (
                            <MenuItem key={name} value={name}>
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      <FormControl variant='standard' sx={{ py: 1, minWidth: '30%' }}>
                        <InputLabel id='operation-select-label'>Operation</InputLabel>
                        <Select
                          labelId='operation-select-label'
                          name='operation'
                          value={tempData.operation}
                          onChange={handleSelectChange}
                          label='Operation'
                          open={operationMenuOpen}
                          onOpen={handleMenuOpen('operation')}
                          onClose={handleMenuClose('operation')}
                          IconComponent={() => (
                            <IconButton
                              size='large'
                              style={{ padding: 0, marginRight: '8px' }}
                              aria-label='open-menu'
                            >
                              <Icon>{operationMenuOpen ? 'arrow_drop_up' : 'arrow_drop_down'}</Icon>
                            </IconButton>
                          )}
                        >
                          {operations.map((name) => (
                            <MenuItem key={name} value={name}>
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <MDButton
                        color='success'
                        type='button'
                        sx={{ my: '10px' }}
                        onClick={handleActionAdd}
                        disabled={!tempData.endpoint || !tempData.operation}
                      >
                        Add
                      </MDButton>
                    </MDBox>
                  )}
                  <MDBox mt={2}>
                    <RuleAction
                      isSorted={false}
                      entriesPerPage={false}
                      showTotalEntries={false}
                      rowData={actionData}
                      operations={operations}
                      endpoints={endpoints}
                      setRowData={setActionData}
                      isEditable={formEditable}
                    />
                  </MDBox>
                </MDBox>
                <MDButton color='success' type='submit'>
                  Save
                </MDButton>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

export default RuleForm
