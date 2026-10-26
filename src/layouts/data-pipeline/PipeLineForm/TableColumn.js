import React, { useState } from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import ListItem from '@mui/material/ListItem'
import MDTypography from 'components/MDTypography'
import MDButton from 'components/MDButton'
import { Icon } from '@mui/material'
import { totalTables } from './Field'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
const TableColumn = ({ tableName, selectedFields, setSelectedFields, selectedTable }) => {
  const [checked, setChecked] = useState([0])
  const [addChecked, setAddChecked] = useState([])
  const [addedField, setAddedField] = useState([])
  const theme = useTheme()
  const newWidth = useMediaQuery(theme.breakpoints.up('md'))

  const handleFieldClick = (field) => {
    setAddChecked((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }))

    if (!addedField.includes(field)) {
      setAddedField((prevState) => [...prevState, field])
    } else {
      setAddedField((prevState) => prevState.filter((item) => item !== field))
    }
  }

  const handleAddBtn = () => {
    setAddChecked({})
    setSelectedFields((prevSelectedFields) => {
      const uniqueFields = [...new Set([...prevSelectedFields, ...addedField])]
      return uniqueFields
    })
    setAddedField([])
  }
  const handleAddAllBtn = () => {
    const selectedTableFields = totalTables.find((table) => table.name === selectedTable)?.fields || []

    setSelectedFields((prevSelectedFields) => {
      const uniqueFields = [...new Set([...prevSelectedFields, ...selectedTableFields])]
      return uniqueFields
    })
  }
  const handleRemoveAllBtn = () => {
    setSelectedFields([])
  }

  const removeFields = () => {
    const updatedFields = selectedFields.filter((field) => !checked[field])
    setSelectedFields(updatedFields)
  }

  return (
    <>
      <Box
        sx={{
          width: !newWidth ? '70vw' : '20vw',
          border: '1px solid lightgray',
          height: '35vh',
          display: 'flex',
          justifyContent: 'space-around',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <MDTypography sx={{ marginTop: '1rem' }} component="a" href="#" variant="h6" color="text" fontWeight="medium">
          {tableName} Fields
        </MDTypography>
        <Box sx={{ flex: 1, overflowY: 'auto', width: '100%' }}>
          <List sx={{ width: '100%', maxWidth: 360 }}>
            {totalTables.map((table, index) => {
              const labelId = `checkbox-list-label-${table}`
              return (
                <>
                  <div key={index}>
                    {selectedTable === table.name &&
                      table.fields.map((field, fieldIndex) => (
                        <ListItemButton
                          key={fieldIndex}
                          onClick={() => {
                            handleFieldClick(field)
                            setAddChecked({ ...addChecked, [field]: !addChecked[field] })
                          }}
                          dense
                          selected={addChecked[field]}
                        >
                          <MDTypography color="secondary" component="a" href="#" variant="h6" fontWeight="light">
                            {field}
                          </MDTypography>
                        </ListItemButton>
                      ))}
                  </div>
                </>
              )
            })}
          </List>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '25vh',
          margin: '1.5rem',
          flexDirection: 'column',
        }}
      >
        <MDButton color="dark" onClick={handleAddBtn} sx={{ marginTop: '1rem', width: '6rem' }}>
          <KeyboardArrowRightIcon fontSize="large" />
        </MDButton>

        <MDButton onClick={handleAddAllBtn} color="dark" sx={{ marginTop: '1rem', width: '6rem' }}>
          <KeyboardDoubleArrowRightIcon fontSize="large" />
        </MDButton>
        <MDButton onClick={removeFields} color="dark" sx={{ marginTop: '1rem', width: '6rem' }}>
          <KeyboardArrowLeftIcon />
        </MDButton>
        <MDButton onClick={handleRemoveAllBtn} color="dark" sx={{ marginTop: '1rem', width: '6rem' }}>
          <KeyboardDoubleArrowLeftIcon fontSize="large" />
        </MDButton>
      </Box>

      <Box
        sx={{
          width: !newWidth ? '70vw' : '20vw',
          border: '1px solid lightgray',
          display: 'flex',
          flexDirection: 'column',
          height: '35vh',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <MDTypography sx={{ marginTop: '1rem' }} component="a" href="#" variant="h6" color="text" fontWeight="medium">
          Selected Fields
        </MDTypography>
        <Box sx={{ flex: 1, overflowY: 'auto' }}>
          <List sx={{ width: '100%', maxWidth: 360 }}>
            {selectedFields.map((value, index) => {
              const labelId = `checkbox-list-label-${value}`

              return (
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    dense
                    selected={checked[value]}
                    onClick={() => setChecked({ ...checked, [value]: !checked[value] })}
                  >
                    <MDTypography component="a" href="#" variant="h6" color="text" fontWeight="light">
                      {value}
                    </MDTypography>
                  </ListItemButton>
                </ListItem>
              )
            })}
          </List>
        </Box>
      </Box>
    </>
  )
}

export default TableColumn
