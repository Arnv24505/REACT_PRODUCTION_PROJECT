import React, { useState } from 'react'
// @mui material components
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'

// Material Dashboard 2 React components
import Paper from '@mui/material/Paper'
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'

// Material Dashboard 2 React example components
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import Container from '@mui/material/Container'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

// Data
import MDButton from 'components/MDButton'
import { Icon } from '@mui/material'

import PipeData from './table/pipeLineData'
import PipeForm from './PipeLineForm'
import DatabaseForm from './PipeLineForm/database/DatabaseForm'
import DatabaseTabaleColumn from './PipeLineForm/DatabaseTableColumn'
import TableColumn from './PipeLineForm/TableColumn'

const dataPipeLineMain = () => {
  const [selectedData, setSelectedData] = useState(false)
  const [showDatabaseForm, setShowDatabaseForm] = useState(false)
  const [showTableColumn, setShowTableColumn] = useState(false)
  const [showSnackbar, setShowSnackbar] = useState(false)
  const [showError, setShowError] = useState(false)
  const [listShown, setListShown] = useState(false)
  const [selectedTable, setSelectedTable] = useState('')
  const [tableName, setTablename] = useState('Table')
  const [selectedFields, setSelectedFields] = useState([])

  const handleAdd = () => {
    setSelectedData(true)
  }

  const handleClose = () => {
    if (showSnackbar) {
      setShowSnackbar(false)
    } else {
      setShowError(false)
    }
  }

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox pt={6} pb={3}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card>
                <MDBox mx={2} mt={-3} py={3} px={2} variant="gradient" bgColor="info" borderRadius="lg">
                  <MDTypography variant="h6" color="white">
                    Data Pipeline
                  </MDTypography>
                </MDBox>
                <MDBox sx={{ mt: 2 }} display="flex" justifyContent="flex-end" paddingRight="1rem">
                  <MDButton
                    color="success"
                    onClick={() => {
                      handleAdd()
                    }}
                  >
                    <Icon sx={{ color: 'inherit', marginRight: '0.5rem' }}>add</Icon>
                    Add
                  </MDButton>
                </MDBox>
                <MDBox pt={3} fullWidth>
                  <PipeData setSelectedData={setSelectedData} />
                  <Paper
                    sx={{
                      marginTop: '0rem',
                      border: 'none',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      boxShadow: 'none',
                    }}
                  >
                    {selectedData && <PipeForm setShowDatabaseForm={setShowDatabaseForm} />}
                  </Paper>

                  {showDatabaseForm && (
                    <DatabaseForm
                      setShowError={setShowError}
                      setShowSnackbar={setShowSnackbar}
                      setShowTableColumn={setShowTableColumn}
                    />
                  )}
                  <Paper
                    sx={{
                      marginTop: listShown ? '-10rem' : '0rem',
                      border: 'none',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      boxShadow: 'none',
                    }}
                  >
                    {showTableColumn && (
                      <DatabaseTabaleColumn
                        setSelectedFields={setSelectedFields}
                        setTablename={setTablename}
                        setSelectedTable={setSelectedTable}
                        setListShown={setListShown}
                      />
                    )}
                  </Paper>
                  {listShown && (
                    <Container
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        alignItems: 'center',
                        marginTop: '-3rem',
                        height: '50vh',
                        position: 'relative',
                        boxShadow: 'none',
                      }}
                    >
                      <TableColumn
                        setSelectedFields={setSelectedFields}
                        selectedFields={selectedFields}
                        selectedTable={selectedTable}
                        tableName={tableName}
                      />
                    </Container>
                  )}
                  {listShown && (
                    <Container style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem' }}>
                      <MDButton
                        color="success"
                        variant="contained"
                        type="submit"
                        style={{ height: '1rem', marginTop: '3vh' }}
                      >
                        Submit
                      </MDButton>
                    </Container>
                  )}
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </DashboardLayout>
      {showSnackbar || showError ? (
        <Snackbar
          open={showError ? showError : showSnackbar}
          autoHideDuration={2500}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Alert
            onClose={handleClose}
            severity={showSnackbar ? 'success' : 'error'}
            variant="filled"
            sx={{ width: '100%', color: '#fff' }}
          >
            {showSnackbar ? 'Successfully connected' : 'Error in database'}
          </Alert>
        </Snackbar>
      ) : null}
    </>
  )
}

export default dataPipeLineMain
