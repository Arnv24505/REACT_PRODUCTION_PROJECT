import { MenuItem, InputLabel, FormControl, OutlinedInput, useTheme } from '@mui/material'
import MDBox from 'components/MDBox'
import Container from '@mui/material/Container'
import React, { useEffect, useState } from 'react'
import Select from '@mui/material/Select'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { IconButton } from '@mui/material'
import TableColumn from './TableColumn'
import { totalTables } from './Field'
const DatabaseTabaleColumn = ({ setSelectedFields, setSelectedTable, setListShown, setTablename }) => {
  const handleChange = (event) => {
    setSelectedTable(event.target.value)
    setListShown(true)
    setSelectedFields([])
  }

  return (
    <>
      <MDBox p={3} style={{ marginTop: '0rem', border: 'none !important', width: '100%' }}>
        <Container
          maxWidth="sm"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '-1rem',
            marginBottom: '2rem',
          }}
        >
          <FormControl fullWidth style={{ width: '54vw' }}>
            <InputLabel>Table names</InputLabel>
            <Select
              label="Database"
              sx={{ height: '2.5rem' }}
              name="database"
              required
              onChange={(e) => {
                handleChange(e)
              }}
              onClick={() => {
                setListShown(true)
              }}
              IconComponent={() => (
                <IconButton size="large" style={{ padding: 0, marginRight: '8px' }} aria-label="open-menu"></IconButton>
              )}
            >
              <MenuItem value="">
                <em>Table list</em>
              </MenuItem>
              {totalTables.map((table, index) => (
                <MenuItem
                  style={{ height: '1.5rem', fontSize: '1rem' }}
                  key={index}
                  value={table.name}
                  onChange={() => {
                    handleChange
                  }}
                  onClick={() => {
                    setTablename(table.name)
                    console.log('>>>>>>>>> table name : ', table.name)
                    setSelectedTable(table.name)
                  }}
                >
                  {table.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Container>
      </MDBox>
    </>
  )
}

export default DatabaseTabaleColumn
