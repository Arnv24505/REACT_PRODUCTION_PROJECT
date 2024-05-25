import { Tooltip } from '@mui/material'
import Icon from '@mui/material/Icon'
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'
import DataTable from 'examples/Tables/DataTable'
import { useDispatch } from 'react-redux'
import _ from 'lodash'
import { deleteDevice } from '../../../../store/device/saga/deviceSaga'
import { deviceTypes } from '../../constants'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Paper, { PaperProps } from '@mui/material/Paper'
import Draggable from 'react-draggable'

function PaperComponent (props: PaperProps) {
  return (
    <Draggable
      handle='#draggable-dialog-title'
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  )
}

const DeviceData = ({
  setSelectedDevice,
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
  const [isDeleted, setIsDeleted] = React.useState(false)
  const [isError, setIsError] = React.useState(false)
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [deletedTemplatedId, setdeletedTemplatedId] = React.useState()
  const dispatch = useDispatch()

  const handleClose = () => {
    setIsDeleted(false)
    setIsDialogOpen(false)
  }
  const handleDialog = (deviceId) => {
    setIsDialogOpen(true)
    setdeletedTemplatedId(deviceId)
  }
  const handleDelete = (deviceId) => {
    setIsDialogOpen(false)
    setIsDeleted(true)
    dispatch(deleteDevice({
      deviceObject: { deviceId }, onSuccess: (status) => {
        if(!status) setIsError(true)
      },
    }))
  }

  const rows = _.map(devices, (data, index) => ({
    name: (
      <MDTypography component='a' href='#' variant='button' color='text' fontWeight='medium'>
        {data.name}
      </MDTypography>
    ),
    type: (
      <MDTypography component='a' href='#' variant='button' color='text' fontWeight='medium'>
        {deviceTypes[data.deviceType]}
      </MDTypography>
    ),
    status: (
      <Tooltip title={data.status}>
        <Icon sx={{ bgcolor: getStatusColor(data.connectionState), height: '10px', width: '10px' }}>{'online'}</Icon>
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
          onClick={() => { setSelectedDevice(data) }}
        >
          <Icon>{'edit'}</Icon>
        </MDTypography>
        <MDTypography
          key={'icon_2'}
          component='a'
          href='#'
          mx='1.5rem'
          color='text'
          onClick={() => handleDialog(data.deviceId)}
        >
          <Icon>{'delete'}</Icon>
        </MDTypography>
      </MDBox>
    ),

  }))

  const handleAction = (icon, data) => {
    // Implement your logic here based on the icon clicked
  }

  const columns = [
    { Header: 'Device Identifier', accessor: 'name', width: '30%', align: 'left' },
    { Header: 'type', accessor: 'type', align: 'left' },
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
      {(isDeleted || isError) && (
        <Snackbar open={isDeleted ? isDeleted : isError} autoHideDuration={2500} onClose={handleClose} anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}>
          <Alert
            onClose={handleClose}
            severity={isDeleted ? 'success' : 'error'}
            variant='filled'
            sx={{ width: '100%', color: '#fff' }}
          >
            {isDeleted ? 'Successfully Deleted' : 'Error in Template'}
          </Alert>
        </Snackbar>)}
      {isDialogOpen && (
        <Dialog
          open={isDialogOpen}
          onClose={() => { setIsDialogOpen(false) }}
          PaperComponent={PaperComponent}
          aria-labelledby='draggable-dialog-title'
        >
          <DialogTitle style={{ cursor: 'move' }} id='draggable-dialog-title'>
            Delete
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete the device form?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => handleDelete(deletedTemplatedId)}>Delete</Button>
          </DialogActions>
        </Dialog>
      )}

    </>
  )
}
export default DeviceData