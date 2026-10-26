import React, { useState } from 'react'
import {
  Card,
  Container,
  Box,
  CssBaseline,
  TextField,
  CardContent,
  CardActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  useMediaQuery,
} from '@mui/material'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import MDTypography from 'components/MDTypography'
import MDButton from 'components/MDButton'
import Tabledata from './Tabledata'
import Snackbaraler from './Snackbaraler'
import { useTheme } from '@mui/material/styles'
import { database } from '../Data/Field'

const Databasepage = ({ setActiveStep, setdatapageShown, setDeviceshown }) => {
  const [iconsShow, setIconshow] = useState(false)
  const [buttonShower, setButtonShower] = useState(false)
  const [tablepageShown, setTablePageShown] = useState(false)
  const [connectBtnclr, setConnectBtnclr] = useState('secondary')
  const [Connectbtntxt, setConnectbtntxt] = useState('Connect')
  const [snackbarShow, setSnackbarShow] = useState(false)
  const [connectBtnDisabled, setConnectBtnDisabled] = useState(false)
  const theme = useTheme()
  const newWidth = useMediaQuery(theme.breakpoints.up('md'))
  const databaseTypes = database[0].databaseType.values

  const validationSchema = Yup.object().shape({
    databaseTypes: Yup.string().required('databaseTypes is required'),
    databaseHost: Yup.string().required('Database host is required'),
    databaseUsername: Yup.string().required('Database username is required'),
    databasePassword: Yup.string().required('Password is required'),
    databaseName: Yup.string().required('Database name is required'),
  })

  const handleOpenMenu = () => {
    setIconshow(true)
  }

  const handleCloseMenu = () => {
    setIconshow(false)
  }

  const tableDatapageShown = () => {
    setActiveStep(2)
    setTablePageShown(true)
  }

  const handleBackbtn = () => {
    setActiveStep(0)
    setdatapageShown(false)
    setDeviceshown(false)
  }

  return (
    <div>
      <CssBaseline />
      {tablepageShown ? (
        <Tabledata setTablePageShown={setTablePageShown} setActiveStep={setActiveStep} />
      ) : (
        <Container maxWidth="sm" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Box
            sx={{
              height: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
              position: 'absolute',
            }}
          >
            <Card
              sx={{
                display: 'flex',
                justifyContent: 'center',
                minWidth: 275,
                width: !newWidth ? '100vw' : '60vw',
                height: '100vh',
              }}
            >
              <Container
                maxWidth="sm"
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', top: '0rem' }}
              >
                <MDTypography style={{ marginBottom: '3rem' }} variant="h6">
                  Database Form
                </MDTypography>
              </Container>
              <Formik
                initialValues={{
                  databaseType: databaseTypes[0],
                  databaseHost: database[0].databaseHost,
                  databaseUsername: database[0].databaseUsername,
                  databasePassword: database[0].databasePassword,
                  databaseName: database[0].databaseName,
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  setConnectBtnclr('success')
                  setButtonShower(true)
                  setConnectbtntxt('Connected')
                  setSnackbarShow(true)
                  setConnectBtnDisabled(true)
                }}
              >
                {({ errors, touched, handleChange, values,isValid }) => (
                  <Form>
                    <CardContent sx={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1.5rem' }}>
                      <div
                        className="container"
                        style={{ width: !newWidth ? '42vw' : '15vw', display: 'flex', alignItems: 'center' }}
                      >
                        <MDTypography component="a" href="#" variant="h6" color="text" fontWeight="medium">
                          Database Type
                        </MDTypography>
                      </div>
                      <div className="container" >
                        <FormControl variant="outlined" sx={{ py: 1, minWidth: '20%', width: '35vw' }}>
                          <InputLabel id="deviceType-select-label">Device Type</InputLabel>
                          <Select
                            labelId="deviceType-select-label"
                            name="databaseTypes"
                            label="databaseTypes"
                            style={{ height: '2.7rem' }}
                            onOpen={handleOpenMenu}
                            onClose={handleCloseMenu}
                            IconComponent={() => (
                              <IconButton
                                size="large"
                                style={{ padding: 0, marginRight: '8px' }}
                                aria-label="open-menu"
                              ></IconButton>
                            )}
                            value={values.deviceType}
                            onChange={handleChange}
                          >
                            {databaseTypes.map((name, index) => (
                              <MenuItem key={index} value={name}>
                                {name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        {touched.deviceType && errors.deviceType && (
                          <span style={{ color: 'red', fontSize: '14px' }}>{errors.deviceType}</span>
                        )}
                      </div>
                      <div
                        className="container"
                        style={{ width: !newWidth ? '42vw' : '15vw', display: 'flex', alignItems: 'center' }}
                      >
                        <MDTypography component="a" href="#" variant="h6" color="text" fontWeight="medium">
                          Database Host
                        </MDTypography>
                      </div>
                      <div className="container" style={{ width: !newWidth ? '42vw' : '15vw' }}>
                        <TextField
                          sx={{ minWidth: '20%', width: '35vw' }}
                          name="databaseHost"
                          value={values.databaseHost}
                          onChange={handleChange}
                          id="outlined-basic"
                          label="Database host"
                          variant="outlined"
                          error={touched.databaseHost && !!errors.databaseHost}
                          helperText={touched.databaseHost && errors.databaseHost}
                        />
                      </div>
                      <div
                        className="container"
                        style={{ width: !newWidth ? '42vw' : '15vw', display: 'flex', alignItems: 'center' }}
                      >
                        <MDTypography component="a" href="#" variant="h6" color="text" fontWeight="medium">
                          Database Username
                        </MDTypography>
                      </div>
                      <div className="container" style={{ width: !newWidth ? '42vw' : '15vw' }}>
                        <TextField
                          sx={{ minWidth: '20%', width: '35vw' }}
                          name="databaseUsername"
                          id="outlined-basic"
                          value={values.databaseUsername}
                          onChange={handleChange}
                          label="Database Username"
                          variant="outlined"
                          error={touched.databaseUsername && !!errors.databaseUsername}
                          helperText={touched.databaseUsername && errors.databaseUsername}
                        />
                      </div>
                      <div
                        className="container"
                        style={{ width: !newWidth ? '42vw' : '15vw', display: 'flex', alignItems: 'center' }}
                      >
                        <MDTypography component="a" href="#" variant="h6" color="text" fontWeight="medium">
                          Database Password
                        </MDTypography>
                      </div>
                      <div className="container" style={{ width: !newWidth ? '42vw' : '15vw' }}>
                        <TextField
                          type="password"
                          sx={{ minWidth: '20%', width: '35vw' }}
                          name="databasePassword"
                          value={values.databasePassword}
                          onChange={handleChange}
                          id="outlined-basic"
                          label="Password"
                          variant="outlined"
                          error={touched.databasePassword && !!errors.databasePassword}
                          helperText={touched.databasePassword && errors.databasePassword}
                        />
                      </div>
                      <div
                        className="container"
                        style={{ width: !newWidth ? '42vw' : '15vw', display: 'flex', alignItems: 'center' }}
                      >
                        <MDTypography component="a" href="#" variant="h6" color="text" fontWeight="medium">
                          Database Name
                        </MDTypography>
                      </div>
                      <div className="container" style={{ width: !newWidth ? '42vw' : '15vw' }}>
                        <TextField
                          sx={{ minWidth: '20%', width: '35vw' }}
                          name="databaseName"
                          id="outlined-basic"
                          value={values.databaseName}
                          onChange={handleChange}
                          label="Database Name"
                          variant="outlined"
                          error={touched.databaseName && !!errors.databaseName}
                          helperText={touched.databaseName && errors.databaseName}
                        />
                      </div>
                    </CardContent>
                    <CardActions>
                      <Container style={{ display: 'flex', justifyContent: 'center' }}>
                        <MDButton
                          variant="contained"
                          onClick={handleBackbtn}
                          
                          color="info"
                          style={{ height: '1rem', marginTop: '3vh', marginRight: '2rem' }}
                        >
                          Back
                        </MDButton>
                        <MDButton
                          disabled = {!isValid}
                          variant="contained"
                          type="submit"
                          color={connectBtnclr}
                          style={{ height: '1rem', marginTop: '3vh' }}
                        >
                          {Connectbtntxt}
                        </MDButton>
                        {buttonShower && (
                          <MDButton
                            color="info"
                            variant="contained"
                            onClick={tableDatapageShown}
                            style={{ height: '1rem', marginTop: '3vh', marginLeft: '2rem' }}
                          >
                            Next
                          </MDButton>
                        )}
                      </Container>
                    </CardActions>
                  </Form>
                )}
              </Formik>
              {snackbarShow && <Snackbaraler setSnackbarShow={setSnackbarShow} snackbarShow={snackbarShow} />}
            </Card>
          </Box>
        </Container>
      )}
    </div>
  )
}

export default Databasepage
