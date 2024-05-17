// @mui material components
import { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'

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

const DeviceMain = () => {

  const dispatch = useDispatch()
  const [selectedDevice, setSelectedDevice] = useState()
  const { devices } = useSelector(userDevicesSelector)
  const { deviceTemplates } = useSelector(deviceTemplatesSelector)
  const { user } = useSelector(userSelector)
  const navigate = useNavigate()
  useEffect(() => {
    if(user) {
      dispatch(getDevices())
      dispatch(getDeviceTemplates())
    } else {
      dispatch(getUser({ navigate }))
    }
  }, [user])

  const handleAdd = () => {
    setSelectedDevice(defaultDevice)
  }
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox display='flex' justifyContent='flex-end' paddingRight='1rem'>
        <MDButton color='success' onClick={() => {
          navigate('/device-template-management')
        }}>
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
                variant='gradient'
                bgColor='info'
                borderRadius='lg'
                coloredShadow='info'
              >
                <MDTypography variant='h6' color='white'>
                  Device Table
                </MDTypography>
              </MDBox>
              <MDBox sx={{ mt: 2 }} display='flex' justifyContent='flex-end' paddingRight='1rem'>
                <MDButton color='success' onClick={handleAdd}>
                  <Icon sx={{ color: 'inherit', marginRight: '0.5rem' }}>add</Icon>
                  Add
                </MDButton>
              </MDBox>
              <MDBox pt={3}>
                <DeviceData devices={devices} setSelectedDevice={setSelectedDevice} />
              </MDBox>
              {selectedDevice && <DeviceForm
                fields={deviceFormDetails}
                selectedDevice={selectedDevice}
                deviceTemplates={deviceTemplates}
                setSelectedDevice={setSelectedDevice}
              />}
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  )
}

export default DeviceMain
