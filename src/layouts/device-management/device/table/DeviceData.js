import { Tooltip } from '@mui/material'
import Icon from '@mui/material/Icon'
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'
import DataTable from 'examples/Tables/DataTable'
import { useDispatch } from 'react-redux'
import _ from 'lodash'
import { deleteDevice } from '../../../../store/device/saga/deviceSaga'
import { deviceTypes } from '../../constants'

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

  const dispatch = useDispatch()
  const handleDelete = (deviceId) => {
    dispatch(deleteDevice({
      deviceObject: { deviceId }, onSuccess: (status) => {
        if(!status) alert('Error in Device')
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
          onClick={() => handleDelete(data.deviceId)}
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
export default DeviceData