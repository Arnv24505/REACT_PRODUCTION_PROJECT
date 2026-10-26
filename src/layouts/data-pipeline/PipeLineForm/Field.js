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
 export const database = [
    {
      "databaseType": {
        "values": ["MySQL", "PostgreSQL", "MongoDB"]
      },
      "databaseHost": "localhost",
      "databaseUsername": "root",
      "databasePassword": "password",
      "databaseName": "my_database"
    }
    
  ]

  export const kafkaConfig = [
    {
      "host": "localhost",
      "port": 9092,
      "topicName": "my_topic",
      "username": "kafka_user",
      "password": "kafka_password",
      "securityType": "PLAIN"
    }
  ]


  export const   totalTables = [
    {
      name: 'Table1',
      fields: ['field1', 'field2', 'field3'],
    },
    {
      name: 'Table2',
      fields: ['field4', 'field5', 'field6'],
    },
    {
      name: 'Table3',
      fields: ['field7', 'field8', 'field9'],
    },
    {
      name: 'Table4',
      fields: ['field10', 'field11', 'field12'],
    },
  ]
  
  export default ruleFormDetails
  