import React from 'react'
import { useState } from 'react'
import {
  Box,
  Container,
  Card,
  CardContent,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  TextField,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import MDTypography from 'components/MDTypography'
import MDButton from 'components/MDButton'
import * as Yup from 'yup'
import { database } from '../Field'
import { Formik, Field, Form } from 'formik'

const DatabaseForm = ({ setShowError, setShowTableColumn, setShowSnackbar }) => {
  const theme = useTheme()
  const newWidth = useMediaQuery(theme.breakpoints.up('md'))

  const validationSchema = Yup.object().shape({
    databaseType: Yup.string().required('Database type is required'),
    databaseHost: Yup.string().required('Database host is required'),
    databaseUsername: Yup.string().required('Database username is required'),
    databasePassword: Yup.string().required('Database password is required'),
    databaseName: Yup.string().required('Database name is required'),
  })
  const databaseTypes = database[0].databaseType.values

  return (
    <>
      <Container maxWidth="sm" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Box
          sx={{
            width: !newWidth ? '90vw' : '74vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            position: 'relative',
            borderRadius: '0px',
          }}
        >
          <Card
            elevation={0}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              minWidth: 275,
              width: !newWidth ? '100vw' : '88vw',
              height: '100vh',
              borderRadius: '0px',
              boxShadow: 'none',
            }}
          >
            <Container
              maxWidth="sm"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '-10rem',
                flexDirection: 'column',
              }}
            >
              <MDTypography style={{ marginBottom: '5rem' }} variant="h6">
                Database Form
              </MDTypography>
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
                  console.log('the new values', values)
                  if (values) {
                    setShowSnackbar(true)
                    setShowTableColumn(true)
                  } else {
                    setShowError(true)
                  }
                }}
              >
                {({ isSubmitting, touched, errors, isValid }) => (
                  <Form>
                    <CardContent
                      sx={{
                        display: 'grid',
                        width: '55vw',
                        gridTemplateColumns: 'repeat(2,1fr)',
                        gap: '1.6rem',
                        marginTop: '-2rem',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <div
                        className="container"
                        style={{ width: !newWidth ? '42vw' : '15vw', display: 'flex', alignItems: 'center' }}
                      >
                        <MDTypography component="a" href="#" variant="h6" color="text" fontWeight="medium">
                          Database Type
                        </MDTypography>
                      </div>
                      <div className="container" style={{ py: 1, minWidth: '20%', width: '35vw' }}>
                        <FormControl fullWidth error={touched.databaseType && !!errors.databaseType}>
                          <InputLabel>Database type</InputLabel>
                          <Field as={Select} name="databaseType" label="Database type" sx={{ height: '2.5rem' }}>
                            {databaseTypes.map((type, index) => (
                              <MenuItem key={index} value={type}>
                                {type}
                              </MenuItem>
                            ))}
                          </Field>
                          {touched.databaseType && errors.databaseType && (
                            <div style={{ color: 'red' }}>{errors.databaseType}</div>
                          )}
                        </FormControl>
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
                        <Field
                          as={TextField}
                          name="databaseHost"
                          id="standard-basic"
                          label="Database host"
                          variant="outlined"
                          sx={{ minWidth: '20%', width: '35vw' }}
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
                        <Field
                          as={TextField}
                          name="databaseUsername"
                          id="standard-basic"
                          label="Database Username"
                          variant="outlined"
                          sx={{ minWidth: '20%', width: '35vw' }}
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
                        <Field
                          as={TextField}
                          type="password"
                          name="databasePassword"
                          id="standard-basic"
                          label="Password"
                          variant="outlined"
                          sx={{ minWidth: '20%', width: '35vw' }}
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
                        <Field
                          as={TextField}
                          name="databaseName"
                          id="standard-basic"
                          label="Database Name"
                          variant="outlined"
                          sx={{ minWidth: '20%', width: '35vw' }}
                          error={touched.databaseName && !!errors.databaseName}
                          helperText={touched.databaseName && errors.databaseName}
                        />
                      </div>
                    </CardContent>
                    <Container style={{ display: 'flex', justifyContent: 'center' }}>
                      <MDButton
                        color="success"
                        variant="contained"
                        type="submit"
                        disabled={!isValid}
                        style={{ height: '1rem', marginTop: '3vh' }}
                      >
                        Connect
                      </MDButton>
                    </Container>
                  </Form>
                )}
              </Formik>
            </Container>
          </Card>
        </Box>
      </Container>
    </>
  )
}

export default DatabaseForm
