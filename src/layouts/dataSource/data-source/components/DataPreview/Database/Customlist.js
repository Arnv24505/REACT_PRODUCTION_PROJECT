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

const CustomList = ({ selectedFields, setSelectedFields, tableName, totalTables, selectedTable, setBtnShow }) => {
  const [checked, setChecked] = React.useState([0])
  const [addChecked, setaddChecked] = useState([])
  const [addedField, setaddedField] = useState([])
  const theme = useTheme()
  const newWidth = useMediaQuery(theme.breakpoints.up('md'))

  const handleFieldClick = (field) => {
    setaddChecked((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }))

    if (!addedField.includes(field)) {
      setaddedField((prevState) => [...prevState, field])
    } else {
      setaddedField((prevState) => prevState.filter((item) => item !== field))
    }
  }

  const handleAddbtn = () => {
    setaddChecked({})
    setSelectedFields((prevSelectedFields) => {
      const uniqueFields = [...new Set([...prevSelectedFields, ...addedField])]
      return uniqueFields
    })
    setaddedField([])
  }
  const RemoveFields = () => {
    const updatedFields = selectedFields.filter((field) => !checked[field])
    setSelectedFields(updatedFields)
  }
  return (
    <>
      <Box
        sx={{
          width: !newWidth ? '70vw' : '22vw',
          border: '1px solid lightgray',
          height: '25vh',
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
                            setaddChecked({ ...addChecked, [field]: !addChecked[field] })
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
      <Box>
        <MDButton
          color="success"
          onClick={() => {
            handleAddbtn()
          }}
        >
          <Icon sx={{ color: 'inherit' }}>add</Icon>
          Add
        </MDButton>
        <Box>
          <MDButton onClick={() => RemoveFields()} color="error" sx={{ marginTop: '1rem', width: '6rem' }}>
            <Icon sx={{ color: 'inherit' }}>delete</Icon>
            Remove
          </MDButton>
        </Box>
      </Box>

      <Box
        sx={{
          width: !newWidth ? '70vw' : '22vw',
          border: '1px solid lightgray',
          display: 'flex',
          flexDirection: 'column',
          height: '25vh',
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

export default CustomList
