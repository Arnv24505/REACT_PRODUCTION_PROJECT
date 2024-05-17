import React, { useEffect, useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import CustomList from './Customlist'
import Dummyjson from './Dummyjson'
import { useTheme } from '@mui/material/styles'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import useMediaQuery from '@mui/material/useMediaQuery'
import MDTypography from 'components/MDTypography'
import { IconButton, MenuItem } from '@mui/material'
import MDButton from 'components/MDButton'

const Tabledata = ({ setActiveStep, settablepageShown }) => {
  const [age, setAge] = useState('')
  const [listShown, setlistshown] = useState(false)
  const [buttonShow, setbtnShow] = useState(false)
  const [DummyjsonShow, setdummyJsonshow] = useState(false)
  const [selectedTable, setselectedTable] = useState('')
  const [tableName, setTablename] = useState('Table')
  const [selectedFields, setselectedFields] = useState([])
  const handleChange = (event) => {
    setAge(event.target.value)
    setselectedTable(event.target.value)
    setlistshown(true)
    setselectedFields([])
    // console.log("I am selected table :::::::::::::::::",selectedTable)
  }

  useEffect(() => {
    console.log('table state updated : ~~~~~~~~', selectedTable)
  }, [selectedTable])
  const totalTables = [
    {
      name: 'Table1',
      fields: ['field1', 'field2', 'field3'],
    },
    {
      name: 'Table2',
      fields: ['field4', 'field5', 'field6'],
    },
    {
      name: 'Table3',
      fields: ['field7', 'field8', 'field9'],
    },
    {
      name: 'Table4',
      fields: ['field10', 'field11', 'field12'],
    },
  ]

  const handleNextbtn = () => {
    setdummyJsonshow(true)
    setActiveStep(3)
  }
  const handleBackbtn = () => {
    settablepageShown(false)
    setActiveStep(2)
  }
  const settablename = (value) => {
    setselectedTable(value)
    setTablename(value)
  }
  const handleAddbtn = () => {
    setbtnShow(true)
  }

  const theme = useTheme()
  const newText = useMediaQuery(theme.breakpoints.up('xl'))
  const newText2 = useMediaQuery(theme.breakpoints.up('lg'))
  const newText3 = useMediaQuery(theme.breakpoints.up('md'))
  const newText4 = useMediaQuery(theme.breakpoints.up('sm'))
  const newText5 = useMediaQuery(theme.breakpoints.up('xs'))
  return (
    <div>
      <React.Fragment>
        <CssBaseline />
        {
          DummyjsonShow ? <Dummyjson setdummyJsonshow={setdummyJsonshow} /> :
            <Container maxWidth='sm' style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Box sx={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexWrap: 'wrap',
                flexDirection: 'column',
              }}>
                <Card sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  minWidth: 275,
                  width: !newText3 ? '100vw' : '60vw',
                  height: '100vh',
                }}>
                  <Container maxWidth='sm' style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '-1rem',
                  }}>
                    <MDTypography style={{ marginBottom: '3rem' }} variant='h6'>
                      Choose Data Table
                    </MDTypography>
                  </Container>
                  <CardContent sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(1,1fr)',
                    justifyContent: 'center',
                    marginTop: '3rem',
                  }}>
                    <Container maxWidth='sm' style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: '-1rem',
                      marginBottom: '2rem',
                    }}>
                      <FormControl variant='standard' sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id='demo-simple-select-standard-label'>Table name</InputLabel>
                        <Select
                          sx={{ width: !newText3 ? '80vw' : '30vw' }}
                          labelId='demo-simple-select-standard-label'
                          id='demo-simple-select-standard'
                          value={age}
                          onChange={handleChange}
                          label='Age'
                          IconComponent={() => (
                            <IconButton
                              size='large'
                              style={{ padding: 0, marginRight: '8px' }}
                              aria-label='open-menu'
                            >
                              <ArrowDropDownIcon />
                            </IconButton>
                          )}
                        >
                          <MenuItem value=''>
                            <em>Table list</em>
                          </MenuItem>

                          {totalTables.map((table, index) => (
                            <MenuItem key={index} value={table.name} onClick={() => {
                              settablename(table.name)
                              console.log('>>>>>>>>> table name : ', table.name)
                              setselectedTable(table.name)
                            }}>
                              {table.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Container>
                    {
                      listShown ? <Container maxWidth='xl' style={{
                          display: 'grid',
                          gridTemplateColumns: !newText3 ? ' 1fr' : '1fr 1fr 1fr',
                          gap: '1rem',
                          alignItems: 'center',
                          marginTop: '3rem',
                          position: 'relative',
                        }}>
                          <CustomList setselectedFields={setselectedFields} selectedFields={selectedFields}
                                      tableName={tableName} totalTables={totalTables} selectedTable={selectedTable}
                                      setbtnShow={setbtnShow} />
                        </Container>
                        : null
                    }
                  </CardContent>
                  <CardActions>
                    <Container style={{ display: 'flex', justifyContent: 'center' }}>
                      <MDButton color='info' variant='contained' onClick={() => { handleBackbtn() }}
                                style={{ height: '1rem', marginTop: '3vh', marginLeft: '2rem' }}>
                        Back
                      </MDButton>
                      <MDButton color='info' variant='contained' onClick={() => { handleNextbtn() }}
                                style={{ height: '1rem', marginTop: '3vh', marginLeft: '2rem' }}>
                        Next
                      </MDButton>
                    </Container>
                  </CardActions>
                </Card>
              </Box>
            </Container>
        }
      </React.Fragment>
    </div>
  )
}

export default Tabledata
