import { Tooltip } from '@mui/material'
import Icon from '@mui/material/Icon'
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'
import DataTable from 'examples/Tables/DataTable'
import { useDispatch } from 'react-redux'
import _ from 'lodash'
import { deleteRule } from '../../../store/rules/saga/ruleSaga'
import { actionTypes } from '../../device-management/constants'

const RuleData = ({
  setSelectedRule,
  rules,
  devices,
}) => {
  // Function to get the background color and label based on status
  const getStatusColor = (status) => {
    let lStatus = status
    if(status === 'true') lStatus = true
    if(status === 'false') lStatus = false
    switch (lStatus) {
      case false:
        return '#FF0000'
      case true:
        return '#4CAF50'
      default:
        return 'grey'
    }
  }
  const getParameterName = (endpoint) => {
    const deviceId = _.first(endpoint.split('.'))
    const fieldId = _.last(endpoint.split('.'))
    const device = _.find(devices, { deviceId })
    if(device) {
      const field = _.find(_.keys(device.deviceInfo.extra), key => key === fieldId)
      if(field) {
        return `${device.name}-${device.deviceInfo.extra[field].name}`
      }
    }
    return ''
  }

  const dispatch = useDispatch()
  const handleDelete = (ruleId) => {
    setSelectedRule()
    dispatch(deleteRule({
      ruleObject: { ruleId }, onSuccess: (status) => {
        if(!status) alert('Error in Device')
      },
    }))
  }
  const rows = _.map(rules, (rule, index) => ({
    name: (
      <MDTypography component='a' href='#' variant='button' color='text' fontWeight='medium'>
        {rule.ruleName}
      </MDTypography>
    ),
    parameter: (
      <MDTypography component='a' href='#' variant='button' color='text' fontWeight='medium'>
        {getParameterName(rule.endpoint)}
      </MDTypography>
    ),
    type: (
      <MDTypography component='a' href='#' variant='button' color='text' fontWeight='medium'>
        {actionTypes[_.first(rule.deviceObjects).actionType]}
      </MDTypography>
    ),
    actionDescription: (
      <MDTypography component='a' href='#' variant='button' color='text' fontWeight='medium'>
        {_.first(rule.deviceObjects).actionDescription}
      </MDTypography>
    ),
    status: (
      <Tooltip title={rule.active}>
        <Icon sx={{ bgcolor: getStatusColor(rule.active), height: '10px', width: '10px' }}>{'online'}</Icon>
      </Tooltip>
    ),
    action: (
      <MDBox gap={3}>
        <MDTypography
          key={'icon_1'}
          component='a'
          href='#'
          mx='1.5rem'
          color='text'
          onClick={() => {
            setSelectedRule({
              ...rule,
              deviceObjects: undefined,
              actionType: _.first(rule.deviceObjects).actionType,
              actionDescription: _.first(rule.deviceObjects).actionDescription,
            })
          }}
        >
          <Icon>{'edit'}</Icon>
        </MDTypography>
        <MDTypography
          key={'icon_2'}
          component='a'
          href='#'
          mx='1.5rem'
          color='text'
          onClick={() => handleDelete(rule.ruleId)}
        >
          <Icon>{'delete'}</Icon>
        </MDTypography>
      </MDBox>
    ),

  }))

  const columns = [
    { Header: 'Rule Identifier', accessor: 'name', width: '30%', align: 'left' },
    { Header: 'Rule Parameter', accessor: 'parameter', width: '30%', align: 'left' },
    { Header: 'Action Type', accessor: 'type', align: 'left' },
    { Header: 'Action Description', accessor: 'actionDescription', align: 'left' },
    { Header: 'status', accessor: 'status', align: 'center' },
    { Header: 'action', accessor: 'action', align: 'center' },
  ]
  return (
    <MDBox>
      <DataTable
        hideEntries={true}
        table={{ columns, rows }}
        isSorted={false}
        entriesPerPage={20}
        showTotalEntries={true}
        noEndBorder
      />

    </MDBox>
  )
}
export default RuleData