// @mui material components
import * as React from 'react'
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
import TemplateData from './table/TemplateData'
import MDButton from 'components/MDButton'
import { Icon } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { userSelector } from '../../../store/user/slice/userSlice'
import { getUser } from '../../../store/user/saga/userSaga'
import { useNavigate } from 'react-router-dom'
import TemplateDataForm from './TemplateForm'
import templateFormDetails from './TemplateForm/fields'
import defaultTemplate from './data/defaultTemplate.json'
import { deviceTemplatesSelector } from '../../../store/device/slice/deviceTemplatesSlice'
import { getDeviceTemplates } from '../../../store/device/saga/deviceTemplatesSaga'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

const TemplateMain = () => {
  const [isAdded, setIsAdded] = React.useState(false)
  const [isUpdated, setIsUpdated] = React.useState(false)
  const [isError, setIsError] = React.useState(false)
  const [isDeleted, setIsDeleted] = React.useState(false)
  const handleClose = () => {
    if(isAdded) {
      setIsAdded(false)
    } else if(isError) {
      setIsError(false)
    } else if(isDeleted) {
      setIsDeleted(false)
    } else {
      setIsUpdated(false)
    }
  }

  const dispatch = useDispatch()
  const [selectedTemplate, setSelectedTemplate] = useState()
  const { deviceTemplates } = useSelector(deviceTemplatesSelector)
  const { user } = useSelector(userSelector)
  const navigate = useNavigate()
  useEffect(() => {
    if(user) {
      dispatch(getDeviceTemplates())
    } else {
      dispatch(getUser({ navigate }))
    }
  }, [user])
  const handleAdd = () => {
    setSelectedTemplate(defaultTemplate)
  }

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox display='flex' justifyContent='flex-end' paddingRight='1rem'>
          <MDButton
            color='success'
            onClick={() => {
              navigate('/device-management')
            }}
          >
            Manage Devices
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
                    Device Templates Table
                  </MDTypography>
                </MDBox>
                <MDBox sx={{ mt: 2 }} display='flex' justifyContent='flex-end' paddingRight='1rem'>
                  <MDButton color='success' onClick={handleAdd}>
                    <Icon sx={{ color: 'inherit', marginRight: '0.5rem' }}>add</Icon>
                    Add
                  </MDButton>
                </MDBox>
                <MDBox pt={3}>
                  <TemplateData
                    setIsDeleted={setIsDeleted}
                    deviceTemplates={deviceTemplates}
                    setSelectedTemplate={setSelectedTemplate}
                  />
                </MDBox>
                {selectedTemplate && (
                  <TemplateDataForm
                    setIsAdded={setIsAdded}
                    setIsUpdated={setIsUpdated}
                    setIsError={setIsError}
                    selectedData={selectedTemplate}
                    setSelectedTemplate={setSelectedTemplate}
                    fields={templateFormDetails}
                    fromTemplate={true}
                  />
                )}
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </DashboardLayout>
      {(isAdded || isError || isUpdated || isDeleted) && (
        <Snackbar
          open={isAdded ? isAdded : isError ? isError : isUpdated ? isUpdated : isDeleted}
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
            variant='filled'
            sx={{ width: '100%', color: '#fff' }}
          >
            {isAdded
              ? 'Successfully Added'
              : isError
                ? 'Error in Template'
                : isUpdated
                  ? 'Updated Successfully'
                  : 'Deleted Successfully'}
          </Alert>
        </Snackbar>
      )}
    </>
  )
}

export default TemplateMain
