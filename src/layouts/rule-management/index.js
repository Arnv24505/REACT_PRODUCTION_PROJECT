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
import RuleData from './table/RuleData'
import MDButton from 'components/MDButton'
import { Icon } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import defaultRule from './data/defaultRule.json'
import ruleFormDetails from './RuleForm/fields'
import { userRulesSelector } from '../../store/rules/slice/ruleSlice'
import _ from 'lodash'
import { getRules } from '../../store/rules/saga/ruleSaga'
import RuleForm from './RuleForm'
import { userDevicesSelector } from '../../store/device/slice/deviceSlice'
import { userSelector } from '../../store/user/slice/userSlice'
import { getDevices } from '../../store/device/saga/deviceSaga'
import { getUser } from '../../store/user/saga/userSaga'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

import * as React from 'react'

const RuleMain = () => {
  const dispatch = useDispatch()
  const [selectedRule, setSelectedRule] = useState()
  const { devices } = useSelector(userDevicesSelector)
  const { rules } = useSelector(userRulesSelector)
  const { user } = useSelector(userSelector)
  const [isAdded, setIsAdded] = useState(false)
  const [isUpdated, setIsUpdated] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)
  const [isError, setIsError] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    if (user) {
      if (_.isEmpty(devices)) dispatch(getDevices())
      if (_.isEmpty(rules)) dispatch(getRules())
    } else {
      dispatch(getUser({ navigate }))
    }
  }, [user])

  const handleClose = () => {
    if (isAdded) {
      setIsAdded(false)
    } else if (isError) {
      setIsError(false)
    } else if (isDeleted) {
      setIsDeleted(false)
    } else {
      setIsUpdated(false)
    }
  }

  const handleAdd = () => {
    setSelectedRule(defaultRule)
  }
  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
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
                    Rules Table
                  </MDTypography>
                </MDBox>
                <MDBox sx={{ mt: 2 }} display="flex" justifyContent="flex-end" paddingRight="1rem">
                  <MDButton color="success" onClick={handleAdd}>
                    <Icon sx={{ color: 'inherit', marginRight: '0.5rem' }}>add</Icon>
                    Add
                  </MDButton>
                </MDBox>
                <MDBox pt={3}>
                  <RuleData
                    setIsDeleted={setIsDeleted}
                    setIsError={setIsError}
                    rules={rules}
                    devices={devices}
                    setSelectedRule={setSelectedRule}
                  />
                </MDBox>
                {selectedRule && (
                  <RuleForm
                    setIsError={setIsError}
                    setIsAdded={setIsAdded}
                    setIsUpdated={setIsUpdated}
                    fields={ruleFormDetails}
                    selectedRule={selectedRule}
                    devices={devices}
                    rules={rules}
                    setSelectedRule={setSelectedRule}
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
            variant="filled"
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

export default RuleMain
