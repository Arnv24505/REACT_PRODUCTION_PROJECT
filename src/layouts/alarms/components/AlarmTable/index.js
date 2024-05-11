import React, { useState } from 'react'
import Icon from '@mui/material/Icon'
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'
import Switch from '@mui/material/Switch' // Import Switch from Material-UI
import DataTable from 'examples/Tables/DataTable'

const AlarmTable = ({ isSorted, entriesPerPage, showTotalEntries, rowData: initialRowData }) => {
  const [rowData, setRowData] = useState(initialRowData)

  console.log('rowData : ', rowData)

  const handleAction = (icon, data) => {
    // Implement your logic here based on the icon clicked
    if(icon === 'delete') {
      // Filter out the row with the specified name to delete
      const updatedRowData = rowData.filter((item) => item.name !== data.name)
      setRowData(updatedRowData)
    }
  }

  const handleStatusToggle = (data) => {
    const updatedRowData = rowData.map((item) =>
      item.name === data.name
        ? { ...item, status: item.status === 'Active' ? 'Inactive' : 'Active' }
        : item
    )
    setRowData(updatedRowData)
  }

  const rows = rowData.map((data, index) => ({
    alarmId: (
      <MDTypography component='a' href='#' variant='button' color='text' fontWeight='medium'>
        { data.name }
      </MDTypography>
    ),
    type: (
      <MDTypography component='a' href='#' variant='button' color='text' fontWeight='medium'>
        { data.type }
      </MDTypography>
    ),
    status: (
      <Switch
        checked={ data.status === 'Active' }
        color='success'
        onChange={ () => handleStatusToggle(data) }
        inputProps={ { 'aria-label': 'controlled' } }
      />
    ),
    ruleName: (
      <MDTypography component='a' href='#' variant='caption' color='text' fontWeight='medium'>
        { data.ruleName }
      </MDTypography>
    ),
    action: (
      <MDBox gap={ 3 }>
        { data.actionIcons.map((icon, index) => (
          <MDTypography
            key={ index }
            component='a'
            href='#'
            mx='0.5rem'
            color='text'
            onClick={ () => handleAction(icon, data) }
          >
            <Icon>{ icon }</Icon>
          </MDTypography>
        )) }
      </MDBox>
    ),
  }))

  const columns = [
    { Header: 'alarm Id', accessor: 'alarmId', width: '30%', align: 'left' },
    { Header: 'alarm type', accessor: 'type', align: 'left' },
    { Header: 'rule Name', accessor: 'ruleName', align: 'center' },
    { Header: 'status', accessor: 'status', align: 'center' },
    { Header: 'action', accessor: 'action', align: 'center' },
  ]

  return (
    <MDBox pt={ 6 } pb={ 3 }>
      <DataTable
        table={ { columns, rows } }
        isSorted={ isSorted }
        entriesPerPage={ entriesPerPage }
        showTotalEntries={ showTotalEntries }
        noEndBorder
      />
    </MDBox>
  )
}

export default AlarmTable
