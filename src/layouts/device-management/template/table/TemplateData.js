import Icon from '@mui/material/Icon'
import * as React from 'react'
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'
import DataTable from 'examples/Tables/DataTable'
import { useDispatch } from 'react-redux'
import _ from 'lodash'
import { deleteDeviceTemplate } from '../../../../store/device/saga/deviceTemplatesSaga'
import { deviceTypes } from '../../constants'
import Button from '@mui/material/Button'
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

const TemplateData = ({
  setSelectedTemplate,
  deviceTemplates,
  setIsDeleted,
}) => {

  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [deletedTemplatedId, setdeletedTemplatedId] = React.useState()

  const dispatch = useDispatch()

  const handleDialog = (id) => {
    setIsDialogOpen(true)
    setdeletedTemplatedId(id)
  }
  const handleDelete = (templateId) => {
    setIsDialogOpen(false)

    dispatch(deleteDeviceTemplate({
      templateObject: { templateId }, onSuccess: (status) => {
        if(!status) {
          setIsError(true)
        } else {
          setIsDeleted(true)
        }
      },
    }))
  }
  const rows = _.map(deviceTemplates, (data, index) => ({
    name: (
      <MDTypography component='a' href='#' variant='button' color='text' fontWeight='medium'>
        {data.basic.templateName}
      </MDTypography>
    ),
    type: (
      <MDTypography component='a' href='#' variant='button' color='text' fontWeight='medium'>
        {deviceTypes[data.basic.deviceType]}
      </MDTypography>
    ),
    action: (
      <MDBox gap={3}>
        <MDTypography
          key={'icon_1'}
          component='a'
          href='#'
          mx='1.5rem'
          color='text'
          onClick={() => { setSelectedTemplate(data) }}
        >
          <Icon>{'edit'}</Icon>
        </MDTypography>
        <MDTypography
          key={'icon_2'}
          component='a'
          href='#'
          mx='1.5rem'
          color='text'
          onClick={() => handleDialog(data.templateId)}
        >
          <Icon>{'delete'}</Icon>
        </MDTypography>
      </MDBox>
    ),
  }))

  const handleAction = (icon, data) => {

  }

  const columns = [
    { Header: 'name', accessor: 'name', width: '30%', align: 'left' },
    { Header: 'type', accessor: 'type', align: 'left' },
    { Header: 'action', accessor: 'action', align: 'center' },
  ]
  return (
    <>

      <MDBox>
        <DataTable
          table={{ columns, rows }}
          hideEntries={true}
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
          PaperComponent={PaperComponent}
          aria-labelledby='draggable-dialog-title'
        >
          <DialogTitle style={{ cursor: 'move' }} id='draggable-dialog-title'>
            Delete
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete device template form?
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
export default TemplateData