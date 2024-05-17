import Icon from '@mui/material/Icon'
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'
import DataTable from 'examples/Tables/DataTable'
import { useEffect, useState } from 'react'
import { Avatar, Link, Tooltip } from '@mui/material'

const ProjectsTableData = ({
  isSorted,
  entriesPerPage,
  showTotalEntries,
  rowData,
  setRowData,
  editData,
  selectedRowData,
  isEditable,
  setPreviewEnable,
}) => {
  const [selectedData, setSelectedData] = useState({})

  useEffect(() => {
    if(Object.keys(editData).length > 0) {
      const updatedRowData = rowData.map((row) => {
        if(row === selectedData) {
          // Update the row data with the new data from editData
          return {
            ...row,
            name: editData.name,
            type: editData.ruleType,
            description: editData.conditions,
            actions: editData.actions,
            actionIcons: ['edit', 'delete'],
          }
        }
        isEditable(false)
        setSelectedData({})
        return row
      })
      setRowData(updatedRowData)
    }
  }, [editData])

  const handlePreview = (data) => {
    selectedRowData(data)
    setPreviewEnable(true)
  }

  // Function to get the background color and label based on status
  const getStatusColor = (status) => {
    switch (status) {
      case 'Critical':
        return '#FF0000'
      case 'major':
        return '#FF5F15'
      case 'minor':
        return '#FFC000'
      case 'complete':
        return '#4CAF50'
      default:
        return 'grey'
    }
  }

  // Map over the rowData and generate rows dynamically
  const rows = rowData.map((data, index) => ({
    name: (
      <MDTypography component='a' href='#' variant='button' color='text' fontWeight='medium'>
        {data.name}
      </MDTypography>
    ),
    type: (
      <MDTypography component='a' href='#' variant='button' color='text' fontWeight='medium'>
        {data.type}
      </MDTypography>
    ),
    status: (
      <MDBox>
        <Tooltip title={data.status}>
          <Avatar sx={{ bgcolor: getStatusColor(data.status), height: '10px', width: '10px' }}> </Avatar>
        </Tooltip>
      </MDBox>
    ),
    description: (
      <MDBox>
        <Link
          variant='caption'
          fontWeight='medium'
          underline='hover'
          onClick={() => {
            handlePreview(data)
          }}
        >
          {data.description}
        </Link>
      </MDBox>
    ),
    action: (
      <MDBox gap={3}>
        {Array.isArray(data.actionIcons) &&
        data.actionIcons.map((icon, index) => (
          <MDTypography
            key={index}
            component='a'
            href='#'
            mx='0.5rem'
            color='text'
            onClick={() => handleAction(icon, data)}
          >
            <Icon>{icon}</Icon>
          </MDTypography>
        ))}
      </MDBox>
    ),
  }))

  // Define click actions for different icons
  const handleAction = (icon, data) => {
    if(icon === 'delete') {
      // Filter out the clicked row and update the state
      const updatedRowData = rowData.filter((row) => row !== data)
      setRowData(updatedRowData)
    } else if(icon === 'edit') {
      isEditable(true)
      selectedRowData(data)
      setSelectedData(data)
    } else {
      // Implement other logic for different icons if needed
      console.info(`Clicked icon: ${icon} of index ${data}`)
    }
  }

  const columns = [
    { Header: 'rule name', accessor: 'name', width: '30%', align: 'left' },
    { Header: 'rule type', accessor: 'type', align: 'left' },
    { Header: 'rule description', accessor: 'description', align: 'center' },
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