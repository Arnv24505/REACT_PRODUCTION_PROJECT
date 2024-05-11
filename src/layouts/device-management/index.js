// @mui material components
import { useState } from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'

// Material Dashboard 2 React components
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'

// Material Dashboard 2 React example components
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import Footer from 'examples/Footer'
import DataTable from 'examples/Tables/DataTable'

// Data
import tableData from 'layouts/device-management/data/tableData'
import ProjectsTableData from './data/projectsTableData'
import MDButton from 'components/MDButton'
import { Icon } from '@mui/material'
import DeviceForm from './DeviceForm'
import newtableData from 'layouts/device-management/data/newtableData.json'
const Tables = () => {

  const [isFormVisible, setIsFormVisible] = useState(false)
  const [submitData, setSubmitData] = useState(false)
  const [valueUpdation, setvalueUpdation] = useState(false)
  const [newname, setName] = useState("");
  const [mainData,setMaindata] = useState();
  const [newtype, setType] = useState("");
  const [isUpdate,setIsUpdate] = useState(false)
  const handleAdd = () => {
    setIsFormVisible(!isFormVisible)
    setvalueUpdation(true)
    setIsUpdate(false)
  }

  const types = [
    'Temp Sensor',
    'AQI Sensor',
    'Switch',
    'Custom Sensor'
  ]

  const locations = [
    'Mumbai',
    'Delhi',
    'Bangalore',
    'Hyderabad',
    'Chennai',
    'Kolkata',
    'Ahmedabad',
    'Pune',
    'Jaipur',
    'Lucknow'
  ]

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox display='flex' justifyContent='flex-end' paddingRight='1rem'>
        <MDButton color='success' onClick={() => { handleAdd() }}>
          <Icon sx={{ color: 'inherit', marginRight: '0.5rem' }}>add</Icon>
          Add
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
              <MDBox pt={3}>
                <ProjectsTableData
                  setName={setName}
                  setType={setType}
                  setMaindata={setMaindata}
                  isSorted={false}
                  setIsUpdate={setIsUpdate}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  setIsFormVisible={setIsFormVisible}
                  setvalueUpdation={setvalueUpdation}
                  valueUpdation={valueUpdation}
                  rowData={newtableData} />
              </MDBox>

            </Card>
            {isFormVisible && <DeviceForm
              rowData={newtableData}
              newname={newname}
              newtype={newtype}
              setvalueUpdation={setvalueUpdation}
              types={types}
              locations={locations}
              isUpdate={isUpdate}
              setSubmitData={setSubmitData}
              mainData={mainData}
              isFormVisible={isFormVisible}
              handleAdd={handleAdd}
              valueUpdation={valueUpdation}
              setIsFormVisible={setIsFormVisible}
            />}
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  )
}

export default Tables
