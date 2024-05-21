const ruleFormDetails = [
  {
    'name': 'ruleName',
    'type': 'text',
    'label': 'Rule Name',
  },
  {
    'name': 'active',
    'type': 'select',
    'label': 'Active',
    'initValue': true,
    'options': [
      { value: true, label: 'Active' },
      { value: false, label: 'Inactive' },
    ],
  },
  {
    'name': 'endpoint',
    'type': 'select',
    'label': 'Source Parameter',
    'options': [],
  },
  {
    'name': 'trigger',
    'type': 'trigger',
    'label': 'Trigger Condition',
    'initValue': '',
  },
  {
    'name': 'actionType',
    'type': 'select',
    'label': 'Action Type',
    'initValue': 'ALARM',
    'options': [
      { value: 'ALARM', label: 'Create Alarm' },
      { value: 'EMAIL', label: 'Send Email' },
      { value: 'SMS', label: 'Send SMS' },
      { value: 'DATA_PIPELINE', label: 'Push to External Data Pipeline' },
    ],
  },
  {
    'name': 'actionDescription',
    'type': 'text',
    'label': 'Description of the Action',
  },

]

export default ruleFormDetails
