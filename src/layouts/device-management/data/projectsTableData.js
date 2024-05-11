import { Avatar, Tooltip } from '@mui/material'
import Icon from '@mui/material/Icon'
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'
import DataTable from 'examples/Tables/DataTable'
import { useState } from 'react'
import { initialState, selectUserName, userRowSlicedata } from '../DeviceRedux/DeviceSlice/DeviceSlice'
import { selectDeviceType, selectName } from '../DeviceRedux/DeviceSelectors/DeviceSelectors'
import { useDispatch, useSelector } from 'react-redux'
import { deleteDevice} from '../DeviceRedux/DeviceSaga/DeviceSaga'

const ProjectsTableData = ({setIsUpdate, setdeviceName, valueUpdation,
  setMaindata,
  setvalueUpdation, setName, setType, isSorted, entriesPerPage, showTotalEntries, rowData, setIsFormVisible }) => {

  // Function to get the background color and label based on status
  const getStatusColor = (status) => {
    switch (status) {
      case 'Inactive':
        return '#FF0000'
      case 'Active':
        return '#4CAF50'
      default:
        return 'grey'
    }
  }
  const dispatch = useDispatch()
  const userrowData = useSelector(userRowSlicedata)
  const handleData = (data) => {
    setIsFormVisible(true);
    setvalueUpdation(false)
    setMaindata(data)
    setIsUpdate(true)
  }


  const handleDelete = (name) => {
    dispatch(deleteDevice({devicename:name}))
  }


  const rows = userrowData.map((data, index) => ({
    name: (
      <MDTypography component='a' href='#' variant='button' color='text' fontWeight='medium'>
        {data.name}
      </MDTypography>
    ),
    type: (
      <MDTypography component='a' href='#' variant='button' color='text' fontWeight='medium'>
        {data.deviceType}
      </MDTypography>
    ),
    status: (
      <Tooltip title={data.status}>
        <Avatar sx={{ bgcolor: getStatusColor(data.status), height: '10px', width: '10px' }}></Avatar>
      </Tooltip>
    ),
    action: (
      <MDBox gap={3}>
        {data.actionIcons.map((icon, iconindex) => {
          return (
            icon === "add_circle_outline_icon" ? (
              <MDTypography
                key={iconindex}
                component='a'
                href='#'
                mx='1.5rem'
                color='text'
                onClick={() => { handleData(data) }}
              >
                <Icon>{icon}</Icon>
              </MDTypography>
            ) :
              icon === "delete" ? (
                <MDTypography
                  key={iconindex}
                  component='a'
                  href='#'
                  mx='1.5rem'
                  color='text'
                  onClick={() => handleDelete(data.name)}
                >
                  <Icon>{icon}</Icon>
                </MDTypography>
              )
                :
                (
                  <MDTypography
                    key={index}
                    component='a'
                    href='#'
                    mx='1.5rem'
                    color='text'
                    onClick={() => handleAction(icon, data)}
                  >
                    <Icon>{icon}</Icon>
                  </MDTypography>
                )
          );
        })}
      </MDBox>
    ),

  }))



  const handleAction = (icon, data) => {
    // Implement your logic here based on the icon clicked
  }

  const columns = [
    { Header: 'name', accessor: 'name', width: '30%', align: 'left' },
    { Header: 'type', accessor: 'type', align: 'left' },
    { Header: 'status', accessor: 'status', align: 'center' },
    { Header: 'action', accessor: 'action', align: 'center' },
  ]

  return (
    <MDBox>
      <DataTable
        table={{ columns, rows }}
        isSorted={isSorted}
        entriesPerPage={entriesPerPage}
        showTotalEntries={showTotalEntries}
        noEndBorder
      />

    </MDBox>
  )
}
export default ProjectsTableData