import React, { useState } from 'react'
import Icon from '@mui/material/Icon'
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'
import DataTable from 'examples/Tables/DataTable'
import MDButton from 'components/MDButton'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { IconButton } from '@mui/material'

const RuleAction = ({
  isSorted,
  entriesPerPage,
  showTotalEntries,
  rowData,
  setRowData,
  operations,
  endpoints,
  isEditable,
}) => {
  const [operationMenuOpen, setOperationMenuOpen] = useState(false)
  const [endpointMenuOpen, setEndpointMenuOpen] = useState(false)

  const [editMode, setEditMode] = useState(null)
  const [editedData, setEditedData] = useState({
    endpoint: '',
    operation: '',
  })

  const handleMenuOpen = (menu) => () => {
    if(menu === 'endpoint') setEndpointMenuOpen(true)
    else if(menu === 'operation') setOperationMenuOpen(true)
  }

  const handleMenuClose = (menu) => () => {
    if(menu === 'endpoint') setEndpointMenuOpen(false)
    else if(menu === 'operation') setOperationMenuOpen(false)
  }

  const rows = rowData.map((data, rowIndex) => ({
    endpoint: (
      <MDTypography
        component='div'
        variant='body2'
        color='text'
        fontWeight='medium'
        onClick={() => handleRowClick(rowIndex, data)}
      >
        {editMode === rowIndex ? (
          <FormControl variant='standard' sx={{ py: 1, minWidth: '30%' }}>
            <Select
              labelId='endpoint-select-label'
              name='endpoint'
              onChange={(e) => handleEditChange('endpoint', e.target.value)} // Update 'endpoint' field here
              label='Endpoint'
              open={endpointMenuOpen}
              onOpen={handleMenuOpen('endpoint')}
              onClose={handleMenuClose('endpoint')}
              IconComponent={() => (
                <IconButton
                  size='large'
                  style={{ padding: 0, marginRight: '8px' }}
                  aria-label='open-menu'
                >
                  <Icon>{endpointMenuOpen ? 'arrow_drop_up' : 'arrow_drop_down'}</Icon>
                </IconButton>
              )}
            >
              {endpoints.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          data.endpoint
        )}
      </MDTypography>
    ),
    operations: (
      <MDTypography
        component='div'
        variant='body2'
        color='text'
        fontWeight='medium'
        onClick={() => handleRowClick(rowIndex, data)}
      >
        {editMode === rowIndex ? (
          <FormControl variant='standard' sx={{ py: 1, minWidth: '100%' }}>
            <Select
              labelId='operation-select-label'
              name='operation'
              onChange={(e) => handleEditChange('operation', e.target.value)}
              label='Operation'
              open={operationMenuOpen}
              onOpen={handleMenuOpen('operation')}
              onClose={handleMenuClose('operation')}
              IconComponent={() => (
                <IconButton
                  size='large'
                  style={{ padding: 0, marginRight: '8px' }}
                  aria-label='open-menu'
                >
                  <Icon>{operationMenuOpen ? 'arrow_drop_up' : 'arrow_drop_down'}</Icon>
                </IconButton>
              )}
            >
              {operations.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          data.operation
        )}
      </MDTypography>
    ),
    action: (
      <MDBox gap={3}>
        {editMode === rowIndex ? (
          <MDButton color='success' size='small' onClick={() => handleSave(rowIndex)}>
            Save
          </MDButton>
        ) : (
          data.actionIcons.map((icon, index) => (
            <MDTypography
              key={index}
              component='a'
              href='#'
              mx='0.5rem'
              color='text'
              onClick={() => handleAction(icon, data, rowIndex)}
            >
              <Icon>{icon}</Icon>
            </MDTypography>
          ))
        )}
      </MDBox>
    ),
  }))

  // Define click actions for different icons
  const handleAction = (icon, data, index) => {
    if(icon === 'delete') {
      // Filter out the row with the specified endpoint to delete
      const updatedRowData = rowData.filter((item) => item.endpoint !== data.endpoint)
      setRowData(updatedRowData)
    } else if(icon === 'edit') {
      setEditMode(index)
      setEditedData({
        endpoint: data.endpoint,
        operation: data.operation,
      })
    }
  }

  const handleRowClick = (index, data) => {
    if(editMode !== index) {
      setEditMode(index)
      setEditedData({
        endpoint: data.endpoint,
        operation: data.operation,
      })
    }
  }

  const handleEditChange = (field, value) => {
    setEditedData((prevData) => ({
      ...prevData,
      [field]: value,
    }))
  }

  const handleSave = (index) => {
    const updatedRowData = rowData.map((data, i) => {
      if(i === index) {
        return {
          ...data,
          endpoint: editedData.endpoint,
          operation: editedData.operation,
        }
      }
      return data
    })

    setRowData(updatedRowData)
    setEditMode(null)
  }

  const columns = [
    { Header: 'Endpoint', accessor: 'endpoint', align: 'center' },
    { Header: 'Operations', accessor: 'operations', align: 'center' },
  ]

  if(isEditable) {
    columns.push({ Header: 'Action', accessor: 'action', align: 'center' })
  }

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

export default RuleAction