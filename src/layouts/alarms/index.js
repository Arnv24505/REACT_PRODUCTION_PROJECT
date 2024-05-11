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
import Grid from "@mui/material/Grid"

// Material Dashboard 2 React components
import MDBox from "components/MDBox"

// Material Dashboard 2 React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout"
import DashboardNavbar from "examples/Navbars/DashboardNavbar"

// Alarms page components
import AlarmTable from './components/AlarmTable'
import tableData from './components/tableData.json'
import { Card } from '@mui/material'
import MDTypography from 'components/MDTypography'

const Alarms = () => {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container spacing={ 6 }>
        <Grid item xs={ 12 }>
          <MDBox mt={ 6 }>
            <Card>
              <MDBox
                mx={ 2 }
                mt={ -3 }
                mb={ -2 }
                py={ 3 }
                px={ 2 }
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Projects Table
                </MDTypography>
              </MDBox>
              <AlarmTable
                isSorted={ false }
                entriesPerPage={ false }
                showTotalEntries={ false }
                rowData={ tableData } />
            </Card>
          </MDBox>
        </Grid>
      </Grid>
    </DashboardLayout>
  )
}

export default Alarms
