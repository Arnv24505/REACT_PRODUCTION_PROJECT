import { LinearProgress, MenuItem, Select, TextField } from '@mui/material'
import { ErrorMessage, Field, Form, Formik } from 'formik'

import React, { useEffect } from 'react'
import _ from 'lodash'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import Autocomplete from '@mui/material/Autocomplete'
import Icon from '@mui/material/Icon'
import MDBox from '../../../../components/MDBox'
import MDTypography from '../../../../components/MDTypography'
import MDButton from '../../../../components/MDButton'
import DataTable from '../../../../examples/Tables/DataTable'
import { useDispatch } from 'react-redux'
import { addDeviceTemplate, updateDeviceTemplate } from '../../../../store/device/saga/deviceTemplatesSaga'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  basic: Yup.object().shape({
    templateName: Yup.string()
      .required('Template name is required')
      .min(3, 'Template name must be at least 3 characters long')
      .max(50, 'Template name must be at most 50 characters long'),
    deviceType: Yup.string().required('Device type is required'),
    connectionInfo: Yup.object().shape({
      type: Yup.string().required('type is required'),
      // mqtt: Yup.object().shape({
      //   username: Yup.string().required("username is required"),
      //   password: Yup.string().required("password is required")
      // }),
    }),
    // connectionInfohttps: Yup.object().shape({
    //   type: Yup.string().required('https type is required'),
    //   https: Yup.object().shape({
    //     basicAuthUsername: Yup.string().required("basicAuthUsername is required"),
    //     basicAuthPassword: Yup.string().required("basicAuthPassword is required")
    //   }),
    // })
  }),
  // fields: Yup.object().shape({
  //   field_1: Yup.object().shape({
  //     accessKey: Yup.string().required('Access key is required'),
  //     name: Yup.string().required('Name is required'),
  //     unit: Yup.string().required('Unit is required'),
  //     max: Yup.number().required('Maximum value is required'),
  //     min: Yup.number().required('Minimum value is required'),
  //     tMax: Yup.number().required('Maximum threshold value is required'),
  //     tMin: Yup.number().required('Minimum threshold value is required'),
  //   })
  // })
})

const defaultHTTPConnectionInfo = {
  type: 'HTTPS',
  https: {
    basicAuthUsername: 'httpsUser',
    basicAuthPassword: 'XXXXXXXXXXXXXX',
    hostName: 'https.qconsole.quarkifi.com',
    qHeaderDevId: 'NNNNNNNNNNNNN',
  },
}

const defaultFieldValues = {
  name: 'Temperature',
  unit: 'Deg C',
  max: 22,
  min: -10,
  tMax: 33,
  tMin: 10,
}

const defaultMQTTConnectionInfo = {
  type: 'MQTT',
  mqtt: {
    hostName: 'mqtt.qconsole.quarkifi.com',
    upStreamPath: '/SENSOR/deviceid/upstream',
    downStreamPath: '/SENSOR/deviceid/downstream',
    username: 'mqttUser',
    password: 'XXXXXXXXXXXXXX',
  },
}

const TemplateForm = ({
  selectedData,
  fields,
  setSelectedTemplate,
  setIsAdded,
  setIsUpdated,
  fromTemplate = false,
}) => {
  const dispatch = useDispatch()

  const getSelect = ({ options, field, props, initial, onChange }) => {
    return (
      <>
        <InputLabel sx={{ mt: 2 }} id={`${props.name}-label`}>
          {props.label}
        </InputLabel>
        <Select
          fullWidth
          labelId={`${props.name}-label`}
          sx={{ minHeight: '50px' }}
          name={field.name}
          label={field.label}
          value={field.name === 'basic.connectionInfo' && field.value ? field.value.type : field.value}
          onChange={(evt) => {
            const current = field.value
            if (field.name === 'basic.connectionInfo' && evt.target.value === 'MQTT') {
              onChange(field.name, defaultMQTTConnectionInfo)
            } else if (field.name === 'basic.connectionInfo' && evt.target.value === 'HTTPS') {
              onChange(field.name, defaultHTTPConnectionInfo)
            } else {
              onChange(field.name, evt.target.value)
            }
          }}
        >
          {_.map(options, ({ label, value }, index) => (
            <MenuItem key={index} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
        {field.name === 'basic.connectionInfo' && field.value && field.value.type === 'MQTT' && (
          <>
            <TextField
              label={'MQTT Host'}
              disabled
              sx={{ minHeight: '50px', mb: 2, mt: 2 }}
              fullWidth
              value={field.value.mqtt.hostName}
            />
            <TextField
              label={'MQTT Upstream Path'}
              disabled
              sx={{ minHeight: '50px', mb: 2, mt: 2 }}
              fullWidth
              value={field.value.mqtt.upStreamPath}
            />
            <TextField
              label={'MQTT Downstream Path'}
              disabled
              sx={{ minHeight: '50px', mb: 2, mt: 2 }}
              fullWidth
              value={field.value.mqtt.downStreamPath}
            />
            <TextField
              label={'MQTT Username'}
              sx={{ minHeight: '50px', mb: 2, mt: 2 }}
              fullWidth
              value={field.value.mqtt.username}
              onChange={(evt) => {
                const current = field.value
                current.mqtt.username = evt.target.value
                onChange(field.name, current)
              }}
            />
            <TextField
              label={'MQTT Password'}
              sx={{ minHeight: '50px', mb: 2, mt: 2 }}
              fullWidth
              value={field.value.mqtt.password}
              onChange={(evt) => {
                const current = field.value
                current.mqtt.password = evt.target.value
                onChange(field.name, current)
              }}
            />
          </>
        )}
        {field.name === 'basic.connectionInfo' && field.value && field.value.type === 'HTTPS' && (
          <>
            <TextField
              label={'HTTPS Host'}
              disabled
              sx={{ minHeight: '50px', mb: 2, mt: 2 }}
              fullWidth
              value={field.value.https.hostName}
            />
            <TextField
              label={'HTTPS Request Header Field (q-dev-id)'}
              disabled
              sx={{ minHeight: '50px', mb: 2, mt: 2 }}
              fullWidth
              value={field.value.https.qHeaderDevId}
            />
            <TextField
              label={'BasicAuthUsername'}
              sx={{ minHeight: '50px', mb: 2, mt: 2 }}
              fullWidth
              value={field.value.https.basicAuthUsername}
              onChange={(evt) => {
                const current = field.value
                current.https.basicAuthUsername = evt.target.value
                onChange(field.name, current)
              }}
            />
            <TextField
              label={'BasicAuthPassword'}
              sx={{ minHeight: '50px', mb: 2, mt: 2 }}
              fullWidth
              value={field.value.https.basicAuthPassword}
              onChange={(evt) => {
                const current = field.value
                current.https.basicAuthPassword = evt.target.value
                onChange(field.name, current)
              }}
            />
          </>
        )}
      </>
    )
  }

  const DeviceField = ({ field, form, ...props }) => {
    console.log('the device field:::', field, props, form)
    const { type, InputProps } = props
    switch (type) {
      case 'text':
        return (
          <TextField
            disabled={field.name === 'basic.templateName' && InputProps.values.templateId}
            value={field.value}
            fullWidth
            sx={{ minHeight: '50px', mt: 2 }}
            {...field}
            {...props}
            error={form.touched.basic?.templateName && !!form.errors.basic?.templateName}
            helperText={form.touched.basic?.templateName && form.errors.basic?.templateName}
          />
        )
      case 'select':
        return getSelect({
          options: InputProps.options,
          initial: InputProps.initial,
          field,
          props,
          onChange: InputProps.change,
        })
      case 'autocomplete':
        return (
          <Autocomplete
            field
            props
            freeSolo
            fullWidth
            value={field.value}
            onChange={(evt, newValue) => {
              InputProps.change(field.name, newValue)
            }}
            options={InputProps.options.map((option) => option.label)}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{ mt: 2 }}
                label={props.label}
                onChange={(evt) => {
                  InputProps.change(field.name, evt.target.value)
                }}
              />
            )}
          />
        )
      case 'table':
        const rows = field.value
          ? _.map(_.keys(field.value), (key) => {
              const row = {}
              _.map(InputProps.columns, ({ accessor }) => {
                const lKey = key
                if (accessor === 'unit') {
                  row[accessor] = (
                    <Autocomplete
                      freeSolo
                      sx={{ width: '120px' }}
                      value={field.value[key].unit}
                      getOptionLabel={(option) => option}
                      onChange={(evt, newValue) => {
                        if (newValue) {
                          const current = field.value
                          current[lKey].unit = newValue
                          InputProps.change(field.name, current)
                        }
                      }}
                      options={['Deg C', 'Fahrenheit']}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          onChange={(evt) => {
                            if (evt.target.value) {
                              const current = field.value
                              current[lKey].unit = evt.target.value
                              InputProps.change(field.name, current)
                            }
                          }}
                        />
                      )}
                    />
                  )
                } else if (accessor === 'action') {
                  row[accessor] = (
                    <MDBox gap={3}>
                      <MDTypography
                        key={'icon_2'}
                        component="a"
                        href="#"
                        mx="1.5rem"
                        color="text"
                        onClick={() => {
                          const current = field.value
                          delete current[lKey]
                          InputProps.change(field.name, current)
                        }}
                      >
                        <Icon>{'delete'}</Icon>
                      </MDTypography>
                    </MDBox>
                  )
                } else {
                  row[accessor] = (
                    <TextField
                      value={field.value[key][accessor]}
                      onChange={(evt) => {
                        const current = field.value
                        current[lKey][accessor] = evt.target.value
                        InputProps.change(field.name, current)
                      }}
                      sx={{ maxWidth: accessor === 'name' || accessor === 'accessKey' ? '120px' : '60px' }}
                    />
                  )
                }
              })
              return row
            })
          : []
        return (
          <MDBox sx={{ mt: 2 }}>
            <InputLabel id={`${props.name}-label`}>{props.label}</InputLabel>
            <MDBox display="flex" justifyContent="flex-end" paddingRight="1rem">
              <MDButton
                color="success"
                onClick={() => {
                  const current = field.value
                  if (current) {
                    const keys = Object.keys(current)
                    if (keys.length > 0) {
                      const lastKeyNo = _.last(_.last(keys).split('_')) * 1
                      const newObj = {
                        accessKey: `field_${lastKeyNo + 1}`,
                        ...defaultFieldValues,
                      }
                      current[`field_${lastKeyNo + 1}`] = newObj
                      InputProps.change(field.name, current)
                    } else {
                      console.error('field.value is empty')
                    }
                  } else {
                    console.error('field.value is undefined or null')
                  }
                }}
              >
                <Icon sx={{ color: 'inherit', marginRight: '0.5rem' }}>add</Icon>
                Add Field
              </MDButton>
            </MDBox>
            <DataTable
              field
              props
              hideEntries={true}
              table={{ columns: InputProps.columns, rows }}
              isSorted={false}
              showTotalEntries={false}
              noEndBorder
            />
          </MDBox>
        )
    }
  }
  useEffect(() => {
    console.log('the selected field properties:::', selectedData)
  }, [])

  return (
    <>
      <Formik
        initialValues={selectedData}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          if (!values.templateId) {
            values.templateId = `${values.basic.templateName.replaceAll(' ', '')}tmplId`
            dispatch(
              addDeviceTemplate({
                templateObject: values,
                onSuccess: (status) => {
                  setSubmitting(false)
                  if (!status) {
                    setIsError(true)
                  } else {
                    setIsAdded(true)
                    setSelectedTemplate()
                  }
                },
              }),
            )
          } else {
            dispatch(
              updateDeviceTemplate({
                templateObject: values,
                onSuccess: (status) => {
                  if (!status) {
                    setIsError(true)
                  } else {
                    setIsUpdated(true)
                    setSelectedTemplate(null)
                  }
                  setSubmitting(false)
                },
              }),
            )
          }
        }}
      >
        {({ submitForm, isSubmitting, setFieldValue, values, isValid, errors }) => {
          console.log('The error and isValid:', errors, isValid)

          return (
            <Grid container sx={{ display: 'flex', justifyContent: 'center', mb: 5 }}>
              <Grid item lg={9} xs={10} mg={9}>
                <Form>
                  {_.map(fields, (field, index) => {
                    const { name, type, component, label, options, initValue, columns } = field
                    return (
                      <Field
                        key={index}
                        component={DeviceField}
                        name={name}
                        type={type}
                        label={label}
                        InputProps={{
                          options,
                          initial: initValue,
                          columns,
                          change: setFieldValue,
                          values,
                        }}
                      />
                    )
                  })}
                  {isSubmitting && <LinearProgress />}
                  <br />
                  <MDBox display="flex" justifyContent="flex-end" paddingRight="1rem">
                    <MDButton
                      color="info"
                      variant="contained"
                      onClick={submitForm}
                      disabled={errors.length > 0 || !isValid}
                    >
                      Submit
                    </MDButton>
                    <ErrorMessage name="fields" component="div" className="error" />
                  </MDBox>
                </Form>
              </Grid>
            </Grid>
          )
        }}
      </Formik>
    </>
  )
}

export default TemplateForm
