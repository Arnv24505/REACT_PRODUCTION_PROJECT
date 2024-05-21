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

const RuleMain = () => {

  const dispatch = useDispatch()
  const [selectedRule, setSelectedRule] = useState()
  const { devices } = useSelector(userDevicesSelector)
  const { rules } = useSelector(userRulesSelector)
  const { user } = useSelector(userSelector)
  const navigate = useNavigate()
  useEffect(() => {
    if(user) {
      if(_.isEmpty(devices)) dispatch(getDevices())
      if(_.isEmpty(rules)) dispatch(getRules())
    } else {
      dispatch(getUser({ navigate }))
    }
  }, [user])

  const handleAdd = () => {
    setSelectedRule(defaultRule)
  }
  return (
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
                variant='gradient'
                bgColor='info'
                borderRadius='lg'
                coloredShadow='info'
              >
                <MDTypography variant='h6' color='white'>
                  Rules Table
                </MDTypography>
              </MDBox>
              <MDBox sx={{ mt: 2 }} display='flex' justifyContent='flex-end' paddingRight='1rem'>
                <MDButton color='success' onClick={handleAdd}>
                  <Icon sx={{ color: 'inherit', marginRight: '0.5rem' }}>add</Icon>
                  Add
                </MDButton>
              </MDBox>
              <MDBox pt={3}>
                <RuleData rules={rules} devices={devices} setSelectedRule={setSelectedRule} />
              </MDBox>
              {selectedRule && <RuleForm
                fields={ruleFormDetails}
                selectedRule={selectedRule}
                devices={devices}
                rules={rules}
                setSelectedRule={setSelectedRule}
              />}
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  )
}

export default RuleMain
