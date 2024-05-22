import { LinearProgress, MenuItem, Select, TextField } from '@mui/material'
import { Field, Form, Formik, ErrorMessage } from 'formik'
import * as React from 'react'
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
import { addDevice, updateDevice } from '../../../../store/device/saga/deviceSaga'
import * as Yup from 'yup';



const getValidationSchema = (values) => {
  return Yup.object().shape({
    name: Yup.string()
      .required('Name is required')
      .min(3, 'Name must be at least 3 characters long')
      .max(50, 'Name must be at most 50 characters long'),
    deviceLocation: Yup.string().required('Location is required'),
    deviceInfo: Yup.object().shape({
      templateInfo: Yup.object().shape({
        templateId: Yup.string().required("Template ID is required")
      }),
      extra: Yup.object().shape({
        field_1: Yup.object().shape({
          accessKey: Yup.string().required('Access key is required'),
          name: Yup.string().required('Name is required'),
          unit: Yup.string().required('Unit is required'),
          max: Yup.number().required('Max value is required'),
          min: Yup.number().required('Min value is required'),
          tMax: Yup.number().required('tMax value is required'),
          tMin: Yup.number().required('tMin value is required'),
        }).required('Field 1 is required'),
      }),
    }),
    deviceType: Yup.string()
      .required('Please select a device type')
      .oneOf(
        ['SWITCH', 'GENERIC_SENSOR', 'WEATHER_SENSOR', 'AQI_SENSOR'],
        'Invalid device type'
      ).required('please select type'),

    connectionInfo: Yup.object().shape({
      type: Yup.string()
        .required('Please select a device type')
        .oneOf(
          ['HTTPS', 'MQTT'],
          'Invalid  type'
        ).required('please select type'),
      mqtt: Yup.object().when(['type'], {
        is: (val) => val === 'MQTT',
        then: Yup.object().shape({
          username: Yup.string().required('MQTT Username is required'),
          password: Yup.string().required('MQTT Password is required'),
        }).required(),
      }),
      https: Yup.object().when(['type'], {
        is: (val) => val === 'HTTPS',
        then: Yup.object().shape({
          basicAuthUsername: Yup.string().required('HTTPS Basic Auth Username is required'),
          basicAuthPassword: Yup.string().required('HTTPS Basic Auth Password is required'),
        }).required(),
      }),
    }),
  });
};



const defaultHTTPConnectionInfo = {
  'type': 'HTTPS',
  'https': {
    'basicAuthUsername': 'httpsUser',
    'basicAuthPassword': 'XXXXXXXXXXXXXX',
    'hostName': 'https.qconsole.quarkifi.com',
    'qHeaderDevId': 'NNNNNNNNNNNNN',
  },
}

const defaultFieldValues = {
  'name': 'Temperature',
  'unit': 'Deg C',
  'max': 22,
  'min': -10,
  'tMax': 33,
  'tMin': 10,
}

const defaultMQTTConnectionInfo = {
  'type': 'MQTT',
  'mqtt': {
    'hostName': 'mqtt.qconsole.quarkifi.com',
    'upStreamPath': '/SENSOR/deviceid/upstream',
    'downStreamPath': '/SENSOR/deviceid/downstream',
    'username': 'mqttUser',
    'password': 'XXXXXXXXXXXXXX',
  },
}

const DeviceForm = ({
  selectedDevice,
  fields,
  setSelectedDevice,
  deviceTemplates,
  setIsAdded,
  setIsError,
  setIsUpdated,
  isUpdated,
  isAdded,
}) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    console.log("the fieldss:::", fields)
  }, [])
  const getSelect = ({ options, field, props, initial, onChange, values, setValues }) => {
    let lOptions = options;
    if (field.name === 'deviceInfo.templateInfo.templateId') {
      lOptions = _.map(deviceTemplates, ({ templateId, basic: { templateName } }) => ({
        value: templateId,
        label: templateName,
      }));
    }
    console.log("the new field and preops of select :::::>>", props, field)
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
          label={props.label}
          value={field.name === 'deviceInfo.connectionInfo' ? field.value.type : field.value}
          onChange={(evt) => {
            if (field.name === 'deviceType') {
              const deviceInfo = _.cloneDeep(values.deviceInfo);
              const deviceId = values.deviceId;
              const deviceType = evt.target.value;
              if (values.deviceInfo.connectionInfo.type === 'MQTT') {
                deviceInfo.connectionInfo.mqtt.upStreamPath = `/${deviceType}/${deviceId}/upstream`;
                deviceInfo.connectionInfo.mqtt.downStreamPath = `/${deviceType}/${deviceId}/downstream`;
              } else if (values.deviceInfo.connectionInfo.type === 'HTTPS') {
                deviceInfo.connectionInfo.https.qHeaderDevId = deviceId;
              }
              setTimeout(() => {
                setValues({
                  ...values,
                  deviceInfo: deviceInfo,
                  deviceType: evt.target.value,
                });
              }, 100);
            } else if (field.name === 'deviceInfo.connectionInfo' && evt.target.value === 'MQTT') {
              const deviceId = values.deviceId;
              const deviceType = values.deviceType;
              defaultMQTTConnectionInfo.mqtt.upStreamPath = `/${deviceType}/${deviceId}/upstream`;
              defaultMQTTConnectionInfo.mqtt.downStreamPath = `/${deviceType}/${deviceId}/downstream`;
              onChange(field.name, defaultMQTTConnectionInfo);
            } else if (field.name === 'deviceInfo.connectionInfo' && evt.target.value === 'HTTPS') {
              const deviceId = values.deviceId;
              defaultHTTPConnectionInfo.https.qHeaderDevId = deviceId;
              onChange(field.name, defaultHTTPConnectionInfo);
            } else if (field.name === 'deviceInfo.templateInfo.templateId') {
              if (!evt.target.value) return;
              const templateId = evt.target.value;
              const template = _.find(deviceTemplates, { templateId });
              const deviceInfo = {
                extra: {},
                templateInfo: { templateId },
                connectionInfo: _.cloneDeep(template.basic.connectionInfo),
              };
              const deviceState = {};
              const deviceId = values.deviceId;
              const deviceType = template.basic.deviceType;
              _.map(_.keys(template.fields), (key) => {
                deviceInfo.extra[key] = template.fields[key];
                deviceState[key] = 0;
              });
              if (deviceInfo.connectionInfo.type === 'MQTT') {
                deviceInfo.connectionInfo.mqtt.upStreamPath = `/${deviceType}/${deviceId}/upstream`;
                deviceInfo.connectionInfo.mqtt.downStreamPath = `/${deviceType}/${deviceId}/downstream`;
              } else if (deviceInfo.connectionInfo.type === 'HTTPS') {
                deviceInfo.connectionInfo.https.qHeaderDevId = deviceId;
              }
              setTimeout(() => {
                setValues({
                  ...values,
                  deviceState: deviceState,
                  deviceInfo: deviceInfo,
                  deviceType: deviceType,
                });
              }, 100);
            } else {
              onChange(field.name, evt.target.value);
            }
          }}
        >
          {_.map(lOptions, ({ label, value }, index) => {
            return (
              <MenuItem key={index} required value={value}>
                {label}
              </MenuItem>
            );
          })}
          <ErrorMessage name='deviceInfo.templateInfo.templateId' component='div' className='error' />
        </Select>
        {field.name === 'deviceInfo.connectionInfo' && field.value.type === 'MQTT' && (
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
              value={field.value.mqtt.upStreamPath.replaceAll('__', '/')}
            />
            <TextField
              label={'MQTT Downstream Path'}
              disabled
              sx={{ minHeight: '50px', mb: 2, mt: 2 }}
              fullWidth
              value={field.value.mqtt.downStreamPath.replaceAll('__', '/')}
            />
            <TextField
              label={'MQTT Username'}
              sx={{ minHeight: '50px', mb: 2, mt: 2 }}
              fullWidth
              value={field.value.mqtt.username}
              onChange={(evt) => {
                const current = field.value;
                current.mqtt.username = evt.target.value;
                onChange(field.name, current);
              }}
            />
            <TextField
              label={'MQTT Password'}
              sx={{ minHeight: '50px', mb: 2, mt: 2 }}
              fullWidth
              value={field.value.mqtt.password}
              onChange={(evt) => {
                const current = field.value;
                current.mqtt.password = evt.target.value;
                onChange(field.name, current);
              }}
            />
          </>
        )}
        {field.name === 'deviceInfo.connectionInfo' && field.value.type === 'HTTPS' && (
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
                const current = field.value;
                current.https.basicAuthUsername = evt.target.value;
                onChange(field.name, current);
              }}
            />
            <TextField
              label={'BasicAuthPassword'}
              sx={{ minHeight: '50px', mb: 2, mt: 2 }}
              fullWidth
              value={field.value.https.basicAuthPassword}
              onChange={(evt) => {
                const current = field.value;
                current.https.basicAuthPassword = evt.target.value;
                onChange(field.name, current);
              }}
            />
          </>
        )}
      </>
    );
  };

  const DeviceField = ({ field, form, ...props }) => {
    const { type, InputProps } = props;
    const { values, template, setall } = InputProps;
    switch (type) {
      case 'text':
        return (
          <TextField
            value={field.value}
            fullWidth
            sx={{ minHeight: '50px', mt: 2 }}
            {...field}
            {...props}
            error={form.touched[field.name] && form.errors[field.name]}
            helperText={form.touched[field.name] && form.errors[field.name]}
            onChange={(evt) => {
              InputProps.change(field.name, evt.target.value);
            }}
          />
        );
      case 'select':
        return getSelect({
          options: InputProps.options,
          initial: InputProps.initial,
          field,
          props,
          onChange: InputProps.change,
          values,
          setValues: setall,
        });
      case 'autocomplete':
        return (
          <Autocomplete
            field
            props
            freeSolo
            fullWidth
            value={field.value}
            name={field.name}

            onChange={(evt, newValue) => {
              InputProps.change(field.name, newValue);
            }}
            options={InputProps.options.map((option) => option.label)}
            renderInput={(params) => (
              <>

                <TextField
                  {...params}
                  sx={{ mt: 2 }}
                  value={field.name}
                  name={field.name}
                  label={props.label}
                  error={form.touched[field.name] && form.errors[field.name]}
                  helperText={form.touched[field.name] && form.errors[field.name]}
                  onChange={(evt) => {
                    InputProps.change(field.name, evt.target.value);
                  }}
                />
                <ErrorMessage name='deviceLoacation' component="div" className='error' />
              </>
            )
            }
          />
        );

      case 'table':
        const rows = _.map(_.keys(field.value.extra), (key) => {
          const row = {};
          _.map(InputProps.columns, ({ accessor }) => {
            const lKey = key;
            if (accessor === 'unit') {
              row[accessor] = (
                <Autocomplete
                  freeSolo
                  sx={{ width: '120px' }}
                  // name={`extra[${key}].unit`}
                  value={field.value.extra[key].unit}
                  getOptionLabel={(option) => option}
                  options={['Deg C', 'Fahrenheit']}
                  onChange={(evt, newValue) => {
                    if (newValue) {
                      const current = field.value;
                      current.extra[lKey].unit = newValue;
                      InputProps.change(field.name, current);
                    }
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              );
            } else if (accessor === 'action') {
              row[accessor] = (
                <MDBox gap={3}>
                  <MDTypography
                    key={'icon_2'}
                    component='a'
                    href='#'
                    mx='1.5rem'
                    color='text'
                    onClick={() => {
                      const current = field.value;
                      const deviceState = _.cloneDeep(values.deviceState);
                      delete current.extra[lKey];
                      delete deviceState[lKey];
                      InputProps.change(field.name, current);
                      setTimeout(() => {
                        setall({
                          ...values,
                          [field.name]: current,
                          deviceState: deviceState,
                        });
                      }, 100);
                    }}
                  >
                    <Icon>{'delete'}</Icon>
                  </MDTypography>
                </MDBox>
              );
            } else {
              row[accessor] = (
                <TextField
                  value={field.value.extra[key][accessor]}
                  onChange={(evt) => {
                    const current = field.value;
                    current.extra[lKey][accessor] = evt.target.value;
                    InputProps.change(field.name, current);
                  }}
                  sx={{
                    maxWidth:
                      accessor === 'name' || accessor === 'accessKey'
                        ? '120px'
                        : '60px',
                  }}
                />
              );
            }
          });
          return row;
        }

        );
        return (
          <MDBox sx={{ mt: 2 }}>
            <InputLabel id={`${props.name}-label`}>{props.label}</InputLabel>
            <MDBox display='flex' justifyContent='flex-end' paddingRight='1rem'>
              <MDButton color='success' onClick={() => {
                const current = field.value
                const lastKeyNo = (_.last(_.last(_.keys(field.value.extra)).split('_'))) * 1
                const newObj = {
                  'accessKey': `field_${lastKeyNo + 1}`,
                  ...defaultFieldValues,
                }
                current.extra[`field_${lastKeyNo + 1}`] = newObj
                InputProps.change(field.name, current)
              }}>
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
        );
    }
  };

  React.useEffect(() => {
    console.log('the selected devices :::>>>>><<<<<', selectedDevice);
  }, [selectedDevice]);

  return (
    <>
      <Formik
        initialValues={selectedDevice}
        validationSchema={getValidationSchema(selectedDevice)}
        enableReinitialize
        onSubmit={(values, { setSubmitting }) => {
          if (_.isEmpty(values.deviceId)) {
            dispatch(
              addDevice({
                deviceObject: values,
                onSuccess: (status) => {
                  setSubmitting(false);
                  if (!status) {
                    setIsError(true);
                  } else {
                    setIsAdded(true);
                    setSelectedDevice();
                  }
                },
              })
            );
          } else {
            dispatch(
              updateDevice({
                deviceObject: values,
                onSuccess: (status) => {
                  setSubmitting(false);
                  if (!status) {
                    setIsError(true);
                  } else {
                    setIsUpdated(true);
                    setSelectedDevice();
                  }
                },
              })
            );
          }
        }}
      >
        {({
          submitForm,
          isSubmitting,
          setFieldValue,
          values,
          setValues,
          isValid,
          errors,
        }) => {
          console.log('details of device formik ', errors, isValid);
          return (
            <Grid container sx={{ display: 'flex', justifyContent: 'center', mb: 5 }}>
              <Grid item lg={9} xs={10} mg={9}>
                <Form>
                  {_.map(
                    _.filter(fields, (entry) => {
                      return !!(
                        (entry.fromTemplate &&
                          values.deviceInfo &&
                          values.deviceInfo.templateInfo &&
                          values.deviceInfo.templateInfo.templateId) ||
                        !entry.fromTemplate
                      );
                    }),
                    (field, index) => {
                      const {
                        name,
                        type,
                        component,
                        label,
                        options,
                        initValue,
                        columns,
                        fromTemplate,
                      } = field;
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
                            template: fromTemplate,
                            setall: setValues,
                          }}
                        />
                      );
                    }
                  )}
                  {isSubmitting && <LinearProgress />}
                  <br />
                  <MDBox display='flex' justifyContent='flex-end' paddingRight='1rem'>
                    <MDButton
                      color='info'
                      variant='contained'
                      onClick={submitForm}
                      // disabled={!_.isEmpty(errors) || !isValid}
                      disabled={isSubmitting || !isValid}
                    >
                      Submit
                    </MDButton>
                  </MDBox>
                </Form>
              </Grid>
            </Grid>
          );
        }}
      </Formik>

    </>
  );
};

export default DeviceForm;
