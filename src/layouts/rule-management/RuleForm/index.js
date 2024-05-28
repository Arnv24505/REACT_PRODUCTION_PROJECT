import { FormHelperText, LinearProgress, MenuItem, Select, TextField } from '@mui/material'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import _ from 'lodash'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import { useDispatch } from 'react-redux'
import MDBox from '../../../components/MDBox'
import MDButton from '../../../components/MDButton'
import { addRule, updateRule } from '../../../store/rules/saga/ruleSaga'
import Typography from '@mui/material/Typography'
import * as Yup from 'yup'

const RuleForm = ({ selectedRule, fields, rules, devices, setSelectedRule, setIsError, setIsAdded, setIsUpdated }) => {
  const dispatch = useDispatch()

  const validationSchema = Yup.object({
    ruleName: Yup.string()
      .required('Rule name is required')
      .min(3, 'Rule name must be at least 3 characters long')
      .max(50, 'Rule name must be at most 50 characters long'),
    active: Yup.boolean().required('Rule must be active or inactive'),
    actionDescription: Yup.string().required('Action description is required'),
    actionType: Yup.string().required('Action type is required'),
    endpoint: Yup.string().required('Source parameter is required'),
    trigger: Yup.string().required('Trigger is required'),
  })

  const getSelect = ({ options, field, form, props, initial, onChange, values }) => {
    let lOptions = options
    if (field.name === 'endpoint') {
      lOptions = []
      _.map(devices, ({ deviceId, name, deviceInfo: { extra } }) => {
        _.map(_.keys(extra), (key) => {
          lOptions.push({
            value: `${deviceId}.${key}`,
            label: `${name}-${extra[key]['name']}`,
          })
        })
      })
    }
    const error = form.touched[field.name] && !!form.errors[field.name]
    const helperText = form.touched[field.name] && form.errors[field.name]
    return (
      <>
        <InputLabel sx={{ mt: 2 }} id={`${props.name}-label`}>
          {props.label}
        </InputLabel>
        <Select
          fullWidth
          labelId={`${props.name}-label`}
          sx={{ minHeight: '50px' }}
          name={props.name}
          label={props.label}
          error={error}
          value={field.value}
          onChange={(evt) => {
            onChange(field.name, evt.target.value)
          }}
        >
          {_.map(lOptions, ({ label, value }, index) => (
            <MenuItem key={index} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
        {error && <Typography color="error">{helperText}</Typography>}
      </>
    )
  }

  const RuleField = ({ field, form, ...props }) => {
    const error = form.touched[field.name] && !!form.errors[field.name]
    const helperText = form.touched[field.name] && form.errors[field.name]

    const { type, InputProps } = props
    const { values } = InputProps
    switch (type) {
      case 'text':
        return (
          <TextField
            value={field.value}
            fullWidth
            sx={{ minHeight: '50px', mt: 2 }}
            {...field}
            {...props}
            error={error}
            helperText={helperText}
            onChange={(evt) => {
              InputProps.change(field.name, evt.target.value)
            }}
          />
        )
      case 'select':
        return getSelect({
          options: InputProps.options,
          initial: InputProps.initial,
          form,
          field,
          props,
          onChange: InputProps.change,
          values,
        })
      case 'trigger':
        let fValue = field.value
        if (!fValue) fValue = '      '
        const parts = field.value?.split(' ')
        let endpoint = values.endpoint,
          endVal = '0',
          condition = '='
        if (parts && parts.length === 3) {
          endVal = _.last(parts)
          condition = parts[1]
        }
        const options = [
          { value: '<', label: '<' },
          { value: '<=', label: '<=' },
          { value: '=', label: '=' },
          { value: '>', label: '>' },
          { value: '>=', label: '>=' },
        ]
        return (
          <>
            <InputLabel sx={{ mt: 2 }} id={`condition-label`}>
              {'Trigger Condition'}
            </InputLabel>
            <Select
              fullWidth
              sx={{ minHeight: '50px' }}
              labelId={'condition-label'}
              label={'Trigger Condition'}
              error={error}
              helperText={helperText}
              defaultValue={'='}
              value={condition}
              onChange={(evt) => {
                InputProps.change(field.name, `${endpoint} ${evt.target.value} ${endVal}`)
              }}
            >
              {_.map(options, ({ label, value }, index) => (
                <MenuItem key={index} value={value}>
                  {label}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{helperText}</FormHelperText>

            <TextField
              fullWidth
              label={'Value'}
              error={error}
              sx={{ minHeight: '50px', mb: 2, mt: 2 }}
              value={endVal}
              onChange={(evt) => {
                InputProps.change(field.name, `${endpoint} ${condition} ${evt.target.value}`)
              }}
            />
          </>
        )
    }
  }

  const initialErrors = {}
  if (!selectedRule.ruleId) {
    initialErrors.endpoint = 'Source parameter is required'
  }

  return (
    <Formik
      initialValues={selectedRule}
      initialTouched={{ endpoint: true }}
      initialErrors={initialErrors}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        if (_.isEmpty(values.ruleId)) {
          dispatch(
            addRule({
              ruleObject: values,
              onSuccess: (status) => {
                setSubmitting(false)
                if (!status) {
                  setIsError(true)
                } else {
                  setIsAdded(true)
                  setSelectedRule()
                }
              },
            }),
          )
        } else {
          dispatch(
            updateRule({
              ruleObject: values,
              onSuccess: (status) => {
                setSubmitting(false)
                if (!status) {
                  setIsError(true)
                } else {
                  setIsUpdated(true)
                  setSelectedRule()
                }
              },
            }),
          )
        }
      }}
    >
      {({ submitForm, isSubmitting, setFieldValue, values, isValid, errors }) => (
        <Grid container sx={{ display: 'flex', justifyContent: 'center', mb: 5 }}>
          <Grid item lg={4} xs={6} mg={4}>
            <Typography sx={{ textAlign: 'center' }} variant={'h6'}>
              {values.ruleId ? 'Rule Edit' : 'Rule Add'}
            </Typography>
            <Form>
              {_.map(fields, (field, index) => {
                const { name, type, label, options, initValue } = field
                return (
                  <Field
                    component={RuleField}
                    name={name}
                    type={type}
                    label={label}
                    InputProps={{
                      options,
                      initial: initValue,
                      change: setFieldValue,
                      values,
                    }}
                    key={index}
                  />
                )
              })}
              {isSubmitting && <LinearProgress />}
              <br />
              <MDBox display="flex" justifyContent="flex-end" paddingRight="1rem">
                <MDButton color="info" variant="contained" disabled={!isValid} onClick={submitForm}>
                  Submit
                </MDButton>
              </MDBox>
            </Form>
          </Grid>
        </Grid>
      )}
    </Formik>
  )
}

export default RuleForm
