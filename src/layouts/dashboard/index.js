// @mui material components
import Grid from '@mui/material/Grid'

// Material Dashboard 2 React components
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'

// Material Dashboard 2 React example components
import DataTable from 'examples/Tables/DataTable'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import Footer from 'examples/Footer'
import ComplexStatisticsCard from 'examples/Cards/StatisticsCards/ComplexStatisticsCard'

// Data
import performanceCard from 'layouts/dashboard/data/performanceCard'
import reportsLineChartData from 'layouts/dashboard/data/reportsLineChartData'
import tableData from 'layouts/dashboard/data/tableData'

// Dashboard components
import CustomComponent from './components/CustomComponent'
import { Card } from '@mui/material'

const Dashboard = () => {
  const { sales, tasks } = reportsLineChartData

  const tableData1 = (tableData) => {
    const dynamicColumns = Object.keys(tableData.rows[0]).map((key) => ({
      Header: key,
      accessor: key,
      align: 'left',
    }))

    return {
      columns: dynamicColumns,
      rows: tableData.rows.map((rowData) => {
        const dynamicRow = {}
        dynamicColumns.forEach((column) => {
          dynamicRow[column.accessor] = (
            <MDTypography component='a' href='#' variant='caption' color='text' fontWeight='medium'>
              {rowData[column.accessor]}
            </MDTypography>
          )
        })
        return dynamicRow
      }),
    }
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          {performanceCard.map((card, index) => (
            <Grid key={index} item xs={12} md={6} lg={2.4}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard {...card} />
              </MDBox>
            </Grid>
          ))}
        </Grid>
        <MDBox mt={4} mb={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <CustomComponent />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Card>
                <MDBox
                  mx={2}
                  mt={-3}
                  py={2}
                  px={2}
                  variant='gradient'
                  bgColor='info'
                  borderRadius='lg'
                  coloredShadow='info'
                >
                  <MDTypography variant='h6' color='white'>
                    Table One
                  </MDTypography>
                </MDBox>
                <MDBox pt={2}>
                  <DataTable
                    table={tableData1(tableData)}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mt={5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <Card>
                <MDBox
                  mx={2}
                  mt={-3}
                  py={2}
                  px={2}
                  variant='gradient'
                  bgColor='info'
                  borderRadius='lg'
                  coloredShadow='info'
                >
                  <MDTypography variant='h6' color='white'>
                    Table Two
                  </MDTypography>
                </MDBox>
                <MDBox pt={2}>
                  <DataTable
                    table={tableData1(tableData)}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                </MDBox>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Card>
                <MDBox
                  mx={2}
                  mt={-3}
                  py={2}
                  px={2}
                  variant='gradient'
                  bgColor='info'
                  borderRadius='lg'
                  coloredShadow='info'
                >
                  <MDTypography variant='h6' color='white'>
                    Table Three
                  </MDTypography>
                </MDBox>
                <MDBox pt={2}>
                  <DataTable
                    table={tableData1(tableData)}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  )
}

export default Dashboard
