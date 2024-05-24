// @mui material components
import { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import * as React from 'react'
// Material Dashboard 2 React components
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'

// Material Dashboard 2 React example components
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'

// Data
import DeviceData from './table/DeviceData'
import MDButton from 'components/MDButton'
import { Icon } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { userSelector } from '../../../store/user/slice/userSlice'
import { getUser } from '../../../store/user/saga/userSaga'
import { useNavigate } from 'react-router-dom'
import defaultDevice from './data/defaultDevice.json'
import DeviceForm from './DeviceForm'
import { deviceTemplatesSelector } from '../../../store/device/slice/deviceTemplatesSlice'
import { getDeviceTemplates } from '../../../store/device/saga/deviceTemplatesSaga'
import { getDevices } from '../../../store/device/saga/deviceSaga'
import { userDevicesSelector } from '../../../store/device/slice/deviceSlice'
import deviceFormDetails from './DeviceForm/fields'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

const DeviceMain = () => {
  const [isAdded, setIsAdded] = React.useState(false)
  const [isError, setIsError] = React.useState(false)
  const [isUpdated, setIsUpdated] = React.useState(false)
  const [selectedDevice, setSelectedDevice] = useState(defaultDevice)

  const { devices } = useSelector(userDevicesSelector)
  const { deviceTemplates } = useSelector(deviceTemplatesSelector)
  const { user } = useSelector(userSelector)
  const dispatch = useDispatch()

  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      dispatch(getDevices())
      dispatch(getDeviceTemplates())
    } else {
      dispatch(getUser({ navigate }))
    }
  }, [user])

  const handleAdd = () => {
    setSelectedDevice(defaultDevice)
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    if (isAdded) {
      setIsAdded(false)
    } else if (isUpdated) {
      setIsUpdated(false)
    } else {
      setIsError(false)
    }
  }

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox display="flex" justifyContent="flex-end" paddingRight="1rem">
          <MDButton
            color="success"
            onClick={() => {
              navigate('/device-template-management')
            }}
          >
            Manage Device Templates
          </MDButton>
        </MDBox>

        <MDBox pt={6} pb={3}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card>
                <MDBox
                  mx={2}
                  mt={-3}
                  py={3}
                  px={2}
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                >
                  <MDTypography variant="h6" color="white">
                    Device Table
                  </MDTypography>
                </MDBox>
                <MDBox sx={{ mt: 2 }} display="flex" justifyContent="flex-end" paddingRight="1rem">
                  <MDButton color="success" onClick={handleAdd}>
                    <Icon sx={{ color: 'inherit', marginRight: '0.5rem' }}>add</Icon>
                    Add
                  </MDButton>
                </MDBox>
                <MDBox pt={3}>
                  <DeviceData devices={devices} setSelectedDevice={setSelectedDevice} />
                </MDBox>
                {selectedDevice && (
                  <DeviceForm
                    isUpdated={isUpdated}
                    isAdded={isAdded}
                    setIsAdded={setIsAdded}
                    setIsError={setIsError}
                    setIsUpdated={setIsUpdated}
                    fields={deviceFormDetails}
                    selectedDevice={selectedDevice}
                    deviceTemplates={deviceTemplates}
                    setSelectedDevice={setSelectedDevice}
                  />
                )}
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </DashboardLayout>
      {(isAdded || isError || isUpdated) && (
        <Snackbar
          open={isAdded ? isAdded : isError ? isError : isUpdated ? isUpdated : null}
          autoHideDuration={2500}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Alert
            onClose={handleClose}
            severity={isAdded ? 'success' : isError ? 'error' : 'success'}
            variant="filled"
            sx={{ width: '100%', color: '#fff' }}
          >
            {isAdded ? 'Successfully Added' : isError ? 'Error in Template' : 'Updated Successfully'}
          </Alert>
        </Snackbar>
      )}
    </>
  )
}

export default DeviceMain
