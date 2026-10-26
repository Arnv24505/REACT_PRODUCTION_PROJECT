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

const Tabledata = ({ setActiveStep, setTablePageShown }) => {
  const [age, setAge] = useState('')
  const [listShown, setListshown] = useState(false)
  const [buttonShow, setBtnShow] = useState(false)
  const [DummyjsonShow, setDummyJsonShow] = useState(false)
  const [selectedTable, setSelectedTable] = useState('')
  const [tableName, setTableName] = useState('Table')
  const [selectedFields, setSelectedFields] = useState([])
  const theme = useTheme()
  const newText3 = useMediaQuery(theme.breakpoints.up('md'))

  const handleChange = (event) => {
    setAge(event.target.value)
    setSelectedTable(event.target.value)
    setListshown(true)
    setSelectedFields([])
  }

  const handleNextbtn = () => {
    setDummyJsonShow(true)
    setActiveStep(3)
  }
  const handleBackbtn = () => {
    setTablePageShown(false)
    setActiveStep(2)
  }
  const setNewTableName = (value) => {
    setSelectedTable(value)
    setTableName(value)
  }
  const handleAddbtn = () => {
    setBtnShow(true)
  }
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

  return (
    <>
      <div>
        <CssBaseline />
        {DummyjsonShow ? (
          <Dummyjson setDummyJsonShow={setDummyJsonShow} />
        ) : (
          <Container maxWidth="sm" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Box
              sx={{
                height: 'auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexWrap: 'wrap',
                flexDirection: 'column',
              }}
            >
              <Card
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  minWidth: 275,
                  width: !newText3 ? '100vw' : '60vw',
                  height: 'auto',
                }}
              >
                <Container
                  maxWidth="sm"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '2rem',
                  }}
                >
                  <MDTypography variant="h6">Choose Data Table</MDTypography>
                </Container>
                <CardContent
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(1,1fr)',
                    justifyContent: 'center',
                    marginTop: '3rem',
                  }}
                >
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
                    <FormControl variant="outlined" sx={{ m: 1 }}>
                      <InputLabel id="demo-simple-select-standard-label">Table name</InputLabel>
                      <Select
                        sx={{ width: !newText3 ? '80vw' : '30vw', height: '2.5rem' }}
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={age}
                        onChange={handleChange}
                        label="Age"
                        IconComponent={() => (
                          <IconButton
                            size="large"
                            style={{ padding: 0, marginRight: '8px' }}
                            aria-label="open-menu"
                          ></IconButton>
                        )}
                      >
                        <MenuItem value="">
                          <em>Table list</em>
                        </MenuItem>

                        {totalTables.map((table, index) => (
                          <MenuItem
                            key={index}
                            value={table.name}
                            onClick={() => {
                              setNewTableName(table.name)
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
                  {listShown ? (
                    <Container
                      maxWidth="xl"
                      style={{
                        display: 'grid',
                        gridTemplateColumns: !newText3 ? ' 1fr' : '1fr 1fr 1fr',
                        gap: '2rem',
                        alignItems: 'center',
                        marginTop: '3rem',
                        position: 'relative',
                      }}
                    >
                      <CustomList
                        setSelectedFields={setSelectedFields}
                        selectedFields={selectedFields}
                        tableName={tableName}
                        totalTables={totalTables}
                        selectedTable={selectedTable}
                        setBtnShow={setBtnShow}
                      />
                    </Container>
                  ) : null}
                </CardContent>
                <CardActions>
                  <Container style={{ display: 'flex', justifyContent: 'center' }}>
                    <MDButton
                      color="info"
                      variant="contained"
                      onClick={() => {
                        handleBackbtn()
                      }}
                      style={{ height: '1rem', marginTop: '3vh', marginLeft: '2rem' }}
                    >
                      Back
                    </MDButton>
                    <MDButton
                      color="info"
                      variant="contained"
                      onClick={() => {
                        handleNextbtn()
                      }}
                      style={{ height: '1rem', marginTop: '3vh', marginLeft: '2rem' }}
                    >
                      Next
                    </MDButton>
                  </Container>
                </CardActions>
              </Card>
            </Box>
          </Container>
        )}
      </div>
    </>
  )
}

export default Tabledata
