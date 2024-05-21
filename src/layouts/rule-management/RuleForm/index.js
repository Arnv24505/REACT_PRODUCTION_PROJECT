import { LinearProgress, MenuItem, Select, TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import * as React from 'react'
import _ from 'lodash'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import { useDispatch } from 'react-redux'
import MDBox from '../../../components/MDBox'
import MDButton from '../../../components/MDButton'
import { addRule, updateRule } from '../../../store/rules/saga/ruleSaga'
import Typography from '@mui/material/Typography'

const RuleForm = ({
  selectedRule,
  fields,
  rules,
  devices,
  setSelectedRule,
}) => {
  const dispatch = useDispatch()
  const getSelect = ({ options, field, props, initial, onChange, values, setValues }) => {
    let lOptions = options
    if(field.name === 'endpoint') {
      lOptions = []
      _.map(devices, ({ deviceId, name, deviceInfo: { extra } }) => {
        _.map(_.keys(extra), key => {
          lOptions.push({
            value: `${deviceId}.${key}`,
            label: `${name}-${extra[key]['name']}`,
          })
        })
      })
    }
    return (
      <>
        <InputLabel sx={{ mt: 2 }} id={`${props.name}-label`}>{props.label}</InputLabel>
        <Select
          fullWidth
          labelId={`${props.name}-label`}
          sx={{ minHeight: '50px' }}
          name={props.name}
          label={props.label}
          defaultValue={_.first(lOptions).value}
          value={field.value}
          onChange={(evt) => {
            //debugger
            onChange(field.name, evt.target.value)
          }}
        >
          {_.map(lOptions, ({ label, value }, index) => (
            <MenuItem key={index} value={value}>{label}</MenuItem>
          ))}
        </Select>
      </>
    )
  }

  const RuleField = ({ field, form, ...props }) => {
    const { type, InputProps } = props
    const { values } = InputProps
    switch (type) {
      case 'text' :
        return <TextField value={field.value} fullWidth
                          sx={{ minHeight: '50px', mt: 2 }} {...field} {...props}
                          onChange={(evt) => {
                            InputProps.change(field.name, evt.target.value)
                          }}
        />
      case 'select' :
        return getSelect({
          options: InputProps.options,
          initial: InputProps.initial,
          field,
          props,
          onChange: InputProps.change,
          values,
        })
      case 'trigger' :
        let fValue = field.value
        if(!fValue) fValue = '      '
        const parts = field.value?.split(' ')
        let endpoint = values.endpoint, endVal = '0', condition = '='
        if(parts && parts.length === 3) {
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
        return (<>
            <InputLabel sx={{ mt: 2 }} id={`condition-label`}>{'Trigger Condition'}</InputLabel>
            <Select
              fullWidth
              sx={{ minHeight: '50px' }}
              labelId={'condition-label'}
              label={'Trigger Condition'}
              defaultValue={'='}
              value={condition}
              onChange={(evt) => {
                //debugger
                InputProps.change(field.name, `${endpoint} ${evt.target.value} ${endVal}`)
              }}
            >
              {_.map(options, ({ label, value }, index) => (
                <MenuItem key={index} value={value}>{label}</MenuItem>
              ))}
            </Select>
            <TextField fullWidth label={'Value'} sx={{ minHeight: '50px', mb: 2, mt: 2 }}
                       value={endVal}
                       onChange={(evt) => {
                         InputProps.change(field.name, `${endpoint} ${condition} ${evt.target.value}`)
                       }}
            />
          </>
        )
    }

  }

  return (
    <Formik
      initialValues={selectedRule}
      validate={(values) => {

      }}
      onSubmit={(values, { setSubmitting }) => {
        if(_.isEmpty(values.ruleId)) {
          dispatch(addRule({
            ruleObject: values, onSuccess: (status) => {
              setSubmitting(false)
              if(!status) {
                alert('Error in Rule')
              } else {
                setSelectedRule()
              }
            },
          }))
        } else {
          dispatch(updateRule({
            ruleObject: values, onSuccess: (status) => {
              setSubmitting(false)
              if(!status) {
                alert('Error in Rule')
              } else {
                setSelectedRule()
              }
            },
          }))
        }
      }}
    >
      {({ submitForm, isSubmitting, setFieldValue, values }) => (
        <Grid container sx={{ display: 'flex', justifyContent: 'center', mb: 5 }}>
          <Grid item lg={4} xs={6} mg={4}>
            <Typography sx={{ textAlign: 'center' }}
                        variant={'h6'}>{values.ruleId ? 'Rule Edit' : 'Rule Add'}</Typography>
            <Form>
              {_.map(fields, (field, index) => {
                const { name, type, label, options, initValue } = field
                return (<Field
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
                />)
              })}
              {isSubmitting && <LinearProgress />}
              <br />
              <MDBox display='flex' justifyContent='flex-end' paddingRight='1rem'>
                <MDButton
                  color='info'
                  variant='contained'
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
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