import { Tooltip } from '@mui/material'
import Icon from '@mui/material/Icon'
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'
import DataTable from 'examples/Tables/DataTable'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import _ from 'lodash'
import { deleteRule } from '../../../store/rules/saga/ruleSaga'
import { actionTypes } from '../../device-management/constants'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Paper, { PaperProps } from '@mui/material/Paper'
import Draggable from 'react-draggable'
const RuleData = ({
  setSelectedRule,
  rules,
  devices,
  setIsDeleted,
  setIsError
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
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [deletedRuleId, setDeletedRuleId] = useState(null)


  const handleDialog = (id) => {
    setIsDialogOpen(true)
    setDeletedRuleId(id)
  }
  const dispatch = useDispatch()
  const handleDelete = (ruleId) => {
    setSelectedRule()
    dispatch(deleteRule({
      ruleObject: { ruleId }, onSuccess: (status) => {
        if(!status){
          setIsError(true)
        }
          else {  
            setIsDialogOpen(false)
            setIsDeleted(true)
        }
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
          onClick={() => handleDialog(rule.ruleId)}
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
    <>
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
    
    {isDialogOpen && (
      <Dialog
        open={isDialogOpen}
        onClose={() => {setIsDialogOpen(false)}}
        PaperComponent={Paper}
        aria-labelledby='draggable-dialog-title'
      >
        <DialogTitle style={{ cursor: 'move' }} id='draggable-dialog-title'>
          Delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this rule data ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => setIsDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => handleDelete(deletedRuleId)}>Delete</Button>
        </DialogActions>
      </Dialog>
   
    )}
    </>
  )
}
export default RuleData