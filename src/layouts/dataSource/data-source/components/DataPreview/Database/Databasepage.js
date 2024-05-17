import React, { useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { styled, useTheme } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import InputLabel from '@mui/material/InputLabel'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import useMediaQuery from '@mui/material/useMediaQuery'
import MDTypography from 'components/MDTypography'

import { IconButton, MenuItem, TextField } from '@mui/material'
import Tabledata from './Tabledata'
import Snackbaraler from './Snackbaraler'
import MDButton from 'components/MDButton'

const deviceType = Array.from({ length: 10 }, (_, index) => String.fromCharCode(97 + index))
const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    height: '6vh',
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))

const Databasepage = ({ setActiveStep, setdatapageShown, setDeviceshown }) => {
  const [iconsShow, setIconshow] = useState(false)
  const [buttonShower, setbuttonShower] = useState(false)
  const [tablepageShown, settablepageShown] = useState(false)
  const [connectBtnclr, setconnectBtnclr] = useState('secondary')
  const [Connectbtntxt, setConnectbtntxt] = useState('Connect')
  const [snackbarShow, setsnackbarShow] = useState(false)
  const [connectBtnDisabled, setConnectBtnDisabled] = useState(false)
  const theme = useTheme()

  const handleOpenMenu = () => {
    setIconshow(true)
  }
  const handleCloseMenu = () => {
    setIconshow(false)
  }
  const tableDatapageShown = () => {
    setActiveStep(2)
    settablepageShown(true)
  }
  const handleBackbtn = () => {
    setActiveStep(0)
    setdatapageShown(false)
    setDeviceshown(false)
  }

  const [formData, setFormData] = useState({
    deviceType: '',
    databaseHost: '',
    databaseUsername: '',
    databasePassword: '',
    databaseName: '',
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target
    if(name === 'deviceType') {
      setFormData({
        ...formData,
        deviceType: value,
      })
    }
    if(name === 'databaseHost') {
      setFormData({
        ...formData,
        databaseHost: value,
      })
    }
    if(name === 'databaseName') {
      setFormData({
        ...formData,
        databaseName: value,
      })
    }
    if(name === 'databaseUsername') {
      setFormData({
        ...formData,
        databaseUsername: value,
      })
    }
    if(name === 'databasePassword') {
      setFormData({
        ...formData,
        databasePassword: value,
      })
    }
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const [Errors, setErrors] = useState({})
  const handleSubmit = (event) => {
    event.preventDefault()
    const validateErrors = {}
    if(!formData.databaseUsername.trim()) {
      validateErrors.databaseUsername = 'Database username is required'
    }
    if(!formData.databaseHost.trim()) {
      validateErrors.databaseHost = 'Database host is required'
    }
    if(!formData.databasePassword.trim()) {
      validateErrors.databasePassword = 'Password is required'
    }
    if(!formData.deviceType.trim()) {
      validateErrors.deviceType = 'Device type is required'
    }
    if(!formData.databaseName.trim()) {
      validateErrors.databaseName = 'Database name is required'
    }
    setErrors(validateErrors)
    if(Object.keys(validateErrors).length === 0) {
      setconnectBtnclr('success')
      setbuttonShower(true)
      setConnectbtntxt('Connected')
      setsnackbarShow(true)
      setConnectBtnDisabled(true)

    }
  }
  const newText = useMediaQuery(theme.breakpoints.up('xl'))
  const newText2 = useMediaQuery(theme.breakpoints.up('lg'))
  const newText3 = useMediaQuery(theme.breakpoints.up('md'))
  const newText4 = useMediaQuery(theme.breakpoints.up('sm'))
  const newText5 = useMediaQuery(theme.breakpoints.up('xs'))

  return (
    <>
      <React.Fragment>
        <CssBaseline />
        {
          tablepageShown ? <Tabledata settablepageShown={settablepageShown} setActiveStep={setActiveStep} /> :
            <Container maxWidth='sm' style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Box sx={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexWrap: 'wrap',
                position: 'absolute',
              }}>
                <Card sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  minWidth: 275,
                  width: !newText3 ? '100vw' : '60vw',
                  height: '100vh',
                }}>
                  <Container maxWidth='sm'
                             style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', Top: '0rem' }}>
                    <MDTypography style={{ marginBottom: '3rem' }} variant='h6'>
                      Database Form
                    </MDTypography>
                  </Container>
                  <form onSubmit={handleSubmit}>
                    <CardContent sx={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1.5rem' }}>

                      <div className='container '
                           style={{ width: !newText3 ? '42vw' : '15vw', display: 'flex', alignItems: 'center' }}>
                        <MDTypography component='a' href='#' variant='h6' color='text' fontWeight='medium'>
                          Database Type
                        </MDTypography>
                      </div>

                      <div className='container ' style={{}}>

                        <FormControl variant='standard' sx={{ py: 1, minWidth: '20%', width: '35vw' }}>
                          <InputLabel id='deviceType-select-label'>Device Type</InputLabel>
                          <Select
                            labelId='deviceType-select-label'
                            name='deviceType'
                            label='Device Type'
                            onOpen={() => { handleOpenMenu() }}
                            onClose={() => { handleCloseMenu() }}
                            IconComponent={() => (
                              <IconButton
                                size='large'
                                style={{ padding: 0, marginRight: '8px' }}
                                aria-label='open-menu'
                              >
                                <ArrowDropDownIcon onClick={() => handleCloseMenu()} />
                              </IconButton>
                            )}
                            value={formData.deviceType}
                            onChange={handleInputChange}
                          >
                            {deviceType.map((name, index) => (
                              <MenuItem key={index} value={name}>{name}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        {Errors.deviceType &&
                        <span style={{ color: 'red', fontSize: '14px' }}>{Errors.deviceType}</span>}
                      </div>
                      <div className='container '
                           style={{ width: !newText3 ? '42vw' : '15vw', display: 'flex', alignItems: 'center' }}>
                        <MDTypography component='a' href='#' variant='h6' color='text' fontWeight='medium'>Database
                          Host </MDTypography>
                      </div>
                      <div className='container ' style={{ width: !newText3 ? '42vw' : '15vw' }}>
                        <TextField sx={{ minWidth: '20%', width: '35vw' }} name='databaseHost'
                                   value={formData.databaseHost} onChange={handleInputChange} id='standard-basic'
                                   label='Database host' variant='standard' />
                        {Errors.databaseHost &&
                        <span style={{ color: 'red', fontSize: '14px' }}>{Errors.databaseHost}</span>}

                      </div>
                      <div className='container '
                           style={{ width: !newText3 ? '42vw' : '15vw', display: 'flex', alignItems: 'center' }}>
                        <MDTypography component='a' href='#' variant='h6' color='text' fontWeight='medium'>Database
                          Username </MDTypography>
                      </div>

                      <div className='container ' style={{ width: !newText3 ? '42vw' : '15vw' }}>
                        <TextField sx={{ minWidth: '20%', width: '35vw' }} name='databaseUsername' id='standard-basic'
                                   value={formData.databaseUsername} onChange={handleInputChange}
                                   label='Database Username' variant='standard' />
                        {Errors.databaseUsername &&
                        <span style={{ color: 'red', fontSize: '14px' }}>{Errors.databaseUsername}</span>}

                      </div>
                      <div className='container '
                           style={{ width: !newText3 ? '42vw' : '15vw', display: 'flex', alignItems: 'center' }}>
                        <MDTypography component='a' href='#' variant='h6' color='text' fontWeight='medium'>Database
                          Password </MDTypography>
                      </div>
                      <div className='container ' style={{ width: !newText3 ? '42vw' : '15vw' }}>
                        <TextField type='password' sx={{ minWidth: '20%', width: '35vw' }} name='databasePassword'
                                   value={formData.databasePassword} onChange={handleInputChange} id='standard-basic'
                                   label='Password' variant='standard' />
                        {Errors.databasePassword &&
                        <span style={{ color: 'red', fontSize: '14px' }}>{Errors.databasePassword}</span>}
                      </div>
                      <div className='container '
                           style={{ width: !newText3 ? '42vw' : '15vw', display: 'flex', alignItems: 'center' }}>
                        <MDTypography component='a' href='#' variant='h6' color='text' fontWeight='medium'>Database
                          Name </MDTypography>
                      </div>
                      <div className='container ' style={{ width: !newText3 ? '42vw' : '15vw' }}>
                        <TextField sx={{ minWidth: '20%', width: '35vw' }} name='databaseName' id='standard-basic'
                                   value={formData.databaseName} onChange={handleInputChange} label='Database Name'
                                   variant='standard' />
                        {Errors.databaseName &&
                        <span style={{ color: 'red', fontSize: '14px' }}>{Errors.databaseName}</span>}
                      </div>
                      {
                        snackbarShow ? <Snackbaraler setsnackbarShow={setsnackbarShow}
                                                     snackbarShow={snackbarShow} /> : null
                      }
                    </CardContent>
                  </form>
                  <CardActions>
                    <Container style={{ display: 'flex', justifyContent: 'center' }}>
                      <MDButton variant='contained' onClick={() => { handleBackbtn() }} color='info'
                                style={{ height: '1rem', marginTop: '3vh', marginRight: '2rem' }}>
                        Back
                      </MDButton>
                      <MDButton disabled={connectBtnDisabled} variant='contained' onClick={(e) => { handleSubmit(e) }}
                                color={connectBtnclr} style={{ height: '1rem', marginTop: '3vh' }}>
                        {Connectbtntxt}
                      </MDButton>
                      {
                        buttonShower ?
                          <MDButton color='info' variant='contained' onClick={(e) => { tableDatapageShown(e) }}
                                    style={{ height: '1rem', marginTop: '3vh', marginLeft: '2rem' }}>
                            Next
                          </MDButton> : null
                      }
                    </Container>
                  </CardActions>
                </Card>
              </Box>

            </Container>

        }

      </React.Fragment>
    </>
  )
}

export default Databasepage
