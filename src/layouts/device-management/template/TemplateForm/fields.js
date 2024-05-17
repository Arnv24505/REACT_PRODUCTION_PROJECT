const templateFormDetails = [
  {
    'name': 'basic.templateName',
    'type': 'text',
    'label': 'Template Name',
  },
  {
    'name': 'basic.deviceType',
    'type': 'select',
    'label': 'Device Type',
    'initValue': 'SWITCH',
    'options': [
      { value: 'SWITCH', label: 'Switch' },
      { value: 'GENERIC_SENSOR', label: 'Generic Sensor' },
      { value: 'WEATHER_SENSOR', label: 'Weather Sensor' },
      { value: 'AQI_SENSOR', label: 'AQI Sensor' },
    ],
  },
  {
    'name': 'basic.connectionInfo',
    'type': 'select',
    'initValue': 'MQTT',
    'label': 'Device Connection Information',
    'options': [
      { value: 'MQTT', label: 'Mqtt(s)' },
      { value: 'HTTPS', label: 'Https' },
    ],
  },
  {
    'name': 'fields',
    'type': 'table',
    'label': 'Device Fields',
    'columns': [
      { Header: 'input access key', accessor: 'accessKey', width: '20%', align: 'left' },
      { Header: 'name', accessor: 'name', width: '30%', align: 'left' },
      { Header: 'unit', accessor: 'unit', align: 'center' },
      { Header: 'mininum value', accessor: 'min', align: 'center' },
      { Header: 'maximum value', accessor: 'max', align: 'center' },
      { Header: 'minimum threshold', accessor: 'tMin', align: 'center' },
      { Header: 'maximum threshold', accessor: 'tMax', align: 'center' },
      { Header: 'action', accessor: 'action', align: 'center' },
    ],
  },
]

export default templateFormDetails
