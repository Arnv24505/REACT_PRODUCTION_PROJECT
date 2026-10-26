import React, { useState } from 'react'
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, OutlinedInput, useTheme } from '@mui/material'
import MDBox from 'components/MDBox'
import { WidthFull } from '@mui/icons-material'
// import { useAsPath } from 'tslint/lib/configuration'

const PipeForm = ({ setShowDatabaseForm }) => {
  const theme = useTheme()
  const [formValues, setFormValues] = useState({
    device: '',
    database: '',
  })


  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  const handleAdd = () => {
    // setIsDatabase(true)
  }
  const handleOnChangeDatabase = (values) =>{
    if(values ==='Database'){
      // setIsDatabase(true)
    }else if(values==='Kafka'){
      // setIsKafa(true)
    }else{
      // setIsSftp(true)
    }
  }
  const databases = ['Database', 'Kafka','SFTP']

  return (
    <MDBox component="form" p={3} style={{ marginTop: '0rem', border: 'none', width: '63%' }} borderRadius="4px">
      <MDBox mb={2} display="flex" alignItems="center" justifyContent="space-between">
        <FormControl fullWidth>
          <InputLabel>Database</InputLabel>
          <Select
            label="Database"
            sx={{ height: '2.5rem' }}
            name="database"
            value={formValues.database}
            onChange={(e)=>{handleInputChange(e.target.value)}}
            required
          >
            {databases.map((database,index) => (
              <MenuItem
                style={{ height: '1.5rem', fontSize: '1rem' }}
                key={index}
                value={database}
                onChange={()=>{handleOnChangeDatabase()}}
              >
                {database}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          className="btn-success"
          onClick={() => {
            handleAdd()
          }}
          style={{ marginLeft: '8px', backgroundColor: '#4CAF50', color: '#fff' }}
        >
          Add
        </Button>
      </MDBox>
    </MDBox>
  )
}

export default PipeForm
