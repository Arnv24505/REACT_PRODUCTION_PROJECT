/**
 =========================================================
 * Material Dashboard 2 React - v2.2.0
 =========================================================
 
 * Product Page: https://www.creative-tim.com/product/material-dashboard-react
 * Copyright 2023 Creative Tim (https://www.creative-tim.com)
 
 Coded by www.creative-tim.com
 
 =========================================================
 
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */

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
import tableDataLocal from 'layouts/rule-management/data/tableData'
import ProjectsTableData from './table/projectsTableData'
import MDButton from 'components/MDButton'
import { Icon } from '@mui/material'
import RuleForm from './RuleForm'
import { deviceType, conditionOperators, values, ruleTypes } from './data/ruleCondition'
import { endpoints, operations } from './data/ruleAction'


const RuleManagement = () => {

  const [isFormVisible, setIsFormVisible] = useState(false)
  const [submitData, setSubmitData] = useState({})
  const [tableData, setTableData] = useState(tableDataLocal)
  const [isRuleTableEditable, setIsRuleTableEditable] = useState(false)
  const [selectedRow, setSelectedRow] = useState({})
  const [previewEnable, setPreviewEnable] = useState(false)

  useEffect(() => {
    setIsFormVisible(isRuleTableEditable)
    if(!isRuleTableEditable) {
      setSubmitData({})
    }
  }, [isRuleTableEditable])


  useEffect(() => {
    setIsFormVisible(previewEnable)
  }, [previewEnable])

  useEffect(() => {

    if(Object.keys(submitData).length > 0 && !isRuleTableEditable) {
      setIsFormVisible(false)
      setTableData(prevTableData => [
        ...prevTableData,
        {
          name: submitData.name,
          type: submitData.ruleType,
          description: submitData.conditions,
          actions: submitData.actions,
          actionIcons: ['edit', 'delete']
        }
      ])
      setSubmitData({})
    }

    if(previewEnable) {
      setIsFormVisible(false)
    }
  }, [submitData])

  const handleAdd = () => {
    setSelectedRow({})
    setIsFormVisible(true)
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox display='flex' justifyContent='flex-end' paddingRight='1rem'>
        <MDButton color='success' onClick={ handleAdd }>
          <Icon sx={ { color: 'inherit', marginRight: '0.5rem' } }>add</Icon>
          Add
        </MDButton>
      </MDBox>

      <MDBox pt={ 6 } pb={ 3 }>
        <Grid container spacing={ 6 }>
          <Grid item xs={ 12 }>
            <Card>
              <MDBox
                mx={ 2 }
                mt={ -3 }
                py={ 3 }
                px={ 2 }
                variant='gradient'
                bgColor='info'
                borderRadius='lg'
                coloredShadow='info'
              >
                <MDTypography variant='h6' color='white'>
                  Rule's Table
                </MDTypography>
              </MDBox>
              <MDBox pt={ 3 }>
                <ProjectsTableData
                  isSorted={ false }
                  entriesPerPage={ false }
                  showTotalEntries={ false }
                  rowData={ tableData }
                  setRowData={ setTableData }
                  selectedRowData={ setSelectedRow }
                  editData={ isRuleTableEditable && submitData }
                  isEditable={ setIsRuleTableEditable }
                  setPreviewEnable={ setPreviewEnable }
                />
              </MDBox>

            </Card>
            { isFormVisible && <RuleForm
              deviceType={ deviceType }
              conditionOperators={ conditionOperators }
              values={ values }
              endpoints={ endpoints }
              operations={ operations }
              ruleTypes={ ruleTypes }
              setSubmitData={ setSubmitData }
              defaultData={ selectedRow }
              previewEnable={ previewEnable }
              setPreviewEnable={ setPreviewEnable }
            /> }
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  )
}

export default RuleManagement
